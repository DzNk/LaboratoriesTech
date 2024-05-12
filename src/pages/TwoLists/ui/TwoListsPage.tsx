import {ActionIcon, Center, Flex, MultiSelect, Space, Stack, Text} from "@mantine/core";
import {useState} from "react";

export function TwoListsPage() {
    const [firstList, setFirstList] = useState<string[]>(["Один", "Два", "Три", "Четыре", "Пять"]);
    const [secondList, setSecondList] = useState<string[]>([]);
    const [firstValuesSelected, setFirstValuesSelected] = useState<string[]>([]);
    const [secondValuesSelected, setSecondValuesSelected] = useState<string[]>([]);

    const handleMoveToSecond = () => {
        const newSecondList = secondList.concat(firstValuesSelected);
        const newFirstList = firstList.filter(item => !firstValuesSelected.includes(item));
        setSecondList(newSecondList);
        setFirstList(newFirstList);
        setFirstValuesSelected([]);
    };

    const handleMoveToFirst = () => {
        const newFirstList = firstList.concat(secondValuesSelected);
        const newSecondList = secondList.filter(item => !secondValuesSelected.includes(item));
        setFirstList(newFirstList);
        setSecondList(newSecondList);
        setSecondValuesSelected([]);
    };

    const handleMoveAllToSecond = () => {
        const newSecondList = secondList.concat(firstList);
        setSecondList(newSecondList);
        setFirstList([]);
        setFirstValuesSelected([]);
    };


    const handleMoveAllToFirst = () => {
        const newFirstList = firstList.concat(secondList);
        setFirstList(newFirstList);
        setSecondList([]);
        setSecondValuesSelected([]);
    };

    return (
        <Center>
            <Stack>
                <Space h={"lg"}/>
                <Flex gap={"lg"}>
                    <MultiSelect w={'15em'} data={firstList} value={firstValuesSelected}
                                 onChange={setFirstValuesSelected} dropdownOpened></MultiSelect>
                    <Text>{firstList.length}</Text>
                    <Stack>
                        <ActionIcon onClick={handleMoveToSecond}>{">"}</ActionIcon>
                        <ActionIcon onClick={handleMoveAllToSecond}>{">>"}</ActionIcon>
                        <ActionIcon onClick={handleMoveToFirst}>{"<"}</ActionIcon>
                        <ActionIcon onClick={handleMoveAllToFirst}>{"<<"}</ActionIcon>
                    </Stack>
                    <Text>{secondList.length}</Text>
                    <MultiSelect w={'15em'} data={secondList} value={secondValuesSelected}
                                 onChange={setSecondValuesSelected} dropdownOpened></MultiSelect>
                </Flex>


            </Stack>
        </Center>
    );
}
