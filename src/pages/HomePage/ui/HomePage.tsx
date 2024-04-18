import {Space, Text} from "@mantine/core";

export function HomePage() {
    return (
        <>
            <Space h={'xl'}/>
            <Text fw={500} size="xl" ta="center">
                Работы по дисциплине "Технологии программирования"
                <br/>
                Выполнил студент группы ДИНРБ31 Харичев Данил
            </Text>
        </>
    );
}