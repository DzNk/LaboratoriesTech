import {Button, Center, Group, Space, Stack, Text} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import styles from "pages/StopWatch/styles/StopWatch.module.scss"

export function StopWatchPage() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    const intervalIdRef = useRef<number | undefined>(undefined);
    const startTimeRef = useRef<number>(0);

    const start = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    const stop = () => {
        setIsRunning(false);
    }

    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    }

    const formatTime = () => {
        const minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        const seconds = Math.floor(elapsedTime / 1000 % 60);
        const milliseconds = Math.floor(elapsedTime % 1000 / 10);

        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = seconds.toString().padStart(2, '0');
        const millisecondsStr = milliseconds.toString().padStart(2, '0');

        return `${minutesStr}:${secondsStr}:${millisecondsStr}`;
    }

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [isRunning]);


    return (
        <>
            <Space h={'xl'}/>
            <Center>
                <Stack>
                    <Text className={styles.text}>{formatTime()}</Text>
                    <Group grow>
                        <Button className={styles.button} onClick={start}>Старт</Button>
                        <Button className={styles.button} onClick={stop}>Стоп</Button>
                        <Button className={styles.button} onClick={reset}>Сброс</Button>
                    </Group>
                </Stack>
            </Center>
        </>
    );
}