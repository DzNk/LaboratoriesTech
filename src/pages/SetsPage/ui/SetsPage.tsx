import {Center, Checkbox, Group, Stack, Title, Text, Select} from "@mantine/core";
import {randomId, useListState} from "@mantine/hooks";
import styles from "pages/SetsPage/styles/SetsPage.module.scss";
import {useEffect, useState} from "react";

const baseArray = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];


export function SetsPage() {
    const [operation, setOperation] = useState<string | null>("");
    const [equal, setIsEqual] = useState<boolean>(false);
    const [aLessEqual, setALessEqual] = useState<boolean>(false);
    const [bLessEqual, setBLessEqual] = useState<boolean>(false);

    const [aValues, aValuesHandlers] = useListState(baseArray.map(
        (value) => ({label: value, checked: false, key: randomId()})
    ));

    const [bValues, bValuesHandlers] = useListState(baseArray.map(
        (value) => ({label: value, checked: false, key: randomId()})
    ));

    const [cValues, cValuesHandlers] = useState(baseArray.map(
        (value) => ({label: value, checked: false, key: randomId()})
    ));


    useEffect(() => {
        const setA = new Set(aValues.filter(v => v.checked).map(v => v.label));
        const setB = new Set(bValues.filter(v => v.checked).map(v => v.label));

        if (setA.size === setB.size && [...setA].every(value => setB.has(value))) {
            setIsEqual(true);
            setALessEqual(false);
            setBLessEqual(false);
        } else if ([...setA].every(value => setB.has(value))) {
            setIsEqual(false);
            setALessEqual(true);
            setBLessEqual(false);
        } else if ([...setB].every(value => setA.has(value))) {
            setIsEqual(false);
            setALessEqual(false);
            setBLessEqual(true);
        } else {
            setIsEqual(false);
            setALessEqual(false);
            setBLessEqual(false);
        }

        switch (operation) {
            case "Объединение":
                cValuesHandlers(cValues.map(c => ({
                    ...c,
                    checked: aValues.some(a => a.label === c.label && a.checked) || bValues.some(b => b.label === c.label && b.checked)
                })));
                break;
            case "Пересечение":
                cValuesHandlers(cValues.map(c => ({
                    ...c,
                    checked: aValues.some(a => a.label === c.label && a.checked) && bValues.some(b => b.label === c.label && b.checked)
                })));
                break;
            case "Разница":
                cValuesHandlers(cValues.map(c => ({
                    ...c,
                    checked: aValues.some(a => a.label === c.label && a.checked) && !bValues.some(b => b.label === c.label && b.checked)
                })));
                break;
            default:
                cValuesHandlers(cValues.map(c => ({
                    ...c,
                    checked: false
                })));
        }
    }, [aValues, bValues, operation]);

    return (
        <Center>
            <Stack>
                <Title>Множества</Title>
                <Group>
                    <Stack gap="xs" className={styles.border}>
                        <Text>SetA</Text>
                        {aValues.map((value, index) => (
                                <Checkbox label={value.label}
                                          checked={value.checked}
                                          key={value.key}
                                          onChange={
                                              (event) => aValuesHandlers.setItemProp(index, 'checked', event.currentTarget.checked)
                                          }/>
                            )
                        )}
                    </Stack>
                    <Stack gap="xs" className={styles.border}>
                        <Text>SetB</Text>
                        {bValues.map((value, index) => (
                                <Checkbox label={value.label}
                                          checked={value.checked}
                                          key={value.key}
                                          onChange={
                                              (event) => bValuesHandlers.setItemProp(index, 'checked', event.currentTarget.checked)
                                          }/>
                            )
                        )}
                    </Stack>
                    <Stack gap="xs" className={styles.border}>
                        <Text>SetC</Text>
                        {cValues.map((value) => (
                                <Checkbox label={value.label}
                                          disabled
                                          checked={value.checked}
                                          key={value.key}
                                          onChange={() => {
                                          }}/>
                            )
                        )}
                    </Stack>
                </Group>
                <Group className={styles.border}>
                    <Stack gap="xs">
                        <Checkbox disabled checked={equal} label="A = B"/>
                        <Checkbox disabled checked={aLessEqual} label="A <= B"/>
                        <Checkbox disabled checked={bLessEqual} label="A >= B"/>
                    </Stack>
                    <Select label="Операция"
                            placeholder="Выберите операцию"
                            value={operation}
                            onChange={setOperation}
                            data={["Объединение", "Пересечение", "Разница"]}/>
                </Group>
            </Stack>
        </Center>
    );
}