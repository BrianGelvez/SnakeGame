import * as React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Header } from './Header';
import { Coordinate, Direction, GestureEventType } from '../types/types';
import { Snake } from './Snake';
import { checkGameOver } from '../utils/checkGameOver';
import { Food } from './Food';
import { checkEatsFood } from '../utils/checkEatsFood';
import { randomFoodPosition } from '../utils/randomFoodPosition';


const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 32, yMin: 0, yMax: 35 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;


export const Game = () :JSX.Element => {

    const [direction, setDirection] = React.useState<Direction>(Direction.right);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    const [score, setScore] = React.useState<number>(0);

    React.useEffect(() => {
        if (!isGameOver) {
            const intervalID = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVAL)
            return () => clearInterval(intervalID)
        }
    }, [isGameOver, snake, isPaused]);

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead }; // copia de la cabeza del gusano

        // game over
        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev);
            return;
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.right:
                newHead.x += 1;
                break;
            default:
                break;

        }

        if (checkEatsFood(newHead, food, 2)) {
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
            setSnake(prevSnake => [...prevSnake, prevSnake[prevSnake.length - 1]])
            setScore(score + SCORE_INCREMENT);
        } else {
            setSnake(prevSnake => [newHead, ...prevSnake.slice(0, -1)])
        }
        
        console.log('newHead:', newHead);
        console.log('GAME_BOUNDS:', GAME_BOUNDS);

    }

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = (event.nativeEvent);
        // console.log(direction)

        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                setDirection(Direction.right)
            } else {
                setDirection(Direction.Left)
            }
        } else {
            if (translationY > 0) {
                setDirection(Direction.Down);
            } else {
                setDirection(Direction.Up)
            }
        }

    }

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDirection(Direction.right);
        setIsPaused(false);
    };

    const pauseGame = () => {
        setIsPaused(!isPaused);
    }

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.conteiner}>
                <Header
                    reloadGame={reloadGame}
                    isPaused={isPaused}
                    pauseGame={pauseGame}
                >
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: Colors.primary,
                    }}>{score}</Text>
                </Header>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({

    conteiner: {
        flex: 1,
        backgroundColor: Colors.secondary,
    },

    boundaries: {
        flex: 1,
        borderWidth: 12,
        borderBottomLeftRadius: 33,
        borderBottomRightRadius: 33,
        borderColor: Colors.primary,
        backgroundColor: "#234b24",
    }
})
