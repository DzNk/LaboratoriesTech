import {Button, Center, Flex, Group, ScrollArea, Space, Stack, Text} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import styles from "pages/StopWatch/styles/StopWatch.module.scss"

export function StopWatchPage() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [runners, setRunners] = useState<number[]>([]);

    const intervalIdRef = useRef<number | undefined>(undefined);
    const startTimeRef = useRef<number>(0);

    const start = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    const stop = () => {
        setIsRunning(false);
        setRunners([...runners, elapsedTime]);
    }

    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
        setRunners([]);
    }

    const formatTime = (elapsedTime: number) => {
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
                <Group>
                    <Stack>
                        <Text className={styles.bigText}>{formatTime(elapsedTime)}</Text>
                        <Group grow>
                            <Button className={styles.button} onClick={start}>Старт</Button>
                            <Button className={styles.button} onClick={stop}>Стоп</Button>
                            <Button className={styles.button} onClick={reset}>Сброс</Button>
                        </Group>
                    </Stack>
                    <Flex className={styles.runners}
                          justify="center"
                          align="flex-start"
                          direction="column"
                          wrap="nowrap">
                        <Text className={styles.runnerHeader}>Список бегунов</Text>
                        {
                            runners.length > 0 &&
                            <Text className={styles.runnerSub}>
                                Общее
                                время {formatTime(runners.reduce((total, currentRunner) => total + currentRunner, 0))}
                            </Text>
                        }
                        <ScrollArea className={styles.border} h={400} w={'100%'}>
                            {
                                runners.map((runner, index) => {
                                    return (
                                        <Text key={index} className={styles.smallText}>
                                            Бегун {index + 1}. - {formatTime(runner)}
                                        </Text>
                                    );
                                })
                            }
                        </ScrollArea>
                    </Flex>
                </Group>
            </Center>
        </>
    );
}