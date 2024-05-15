import {
    Button,
    Center,
    Group,
    MultiSelect,
    Radio,
    SegmentedControl,
    Space,
    Stack,
    TextInput,
    Title
} from "@mantine/core";
import {useEffect, useState} from "react";
import styles from "pages/WordMakerPage/styles/WordMaker.module.scss";
import {saveAs} from "file-saver";

const startWordList = ["big box", "book", "carpet", "chair", "computer", "pen", "pencil"];
const wordInputs = [
    {label: "Первый", value: "first"},
    {label: "Второй", value: "second"}
];
const positions = ["on", "under", "near"];

export function WordMakerPage() {
    const [firstSubject, setFirstSubject] = useState<string[]>(startWordList);
    const [secondSubject, setSecondSubject] = useState<string[]>(startWordList);
    const [inputName, setInputName] = useState<string>(wordInputs[0].value);
    const [position, setPosition] = useState<string>(positions[0]);
    const [input, setInput] = useState<string>("");
    const [result, setResult] = useState<string>("");

    const [firstWords, setFirstWords] = useState<string[]>([]);
    const [secondWords, setSecondWords] = useState<string[]>([]);

    const makePhrase = (firstWords: string[], secondWords: string[], verb: string) => {
        if (firstWords.length === 0 || secondWords.length === 0) return "";

        const joinWords = (words: string[]) => {
            if (words.length === 1) return words[0];
            const wordsBatch = words.slice(0, -1).join(", ");
            return `${wordsBatch} and ${words[words.length - 1]}`;
        };

        const first = joinWords(firstWords);
        const second = joinWords(secondWords);
        let connector: string = "is";
        if (firstWords.length > 1) connector = "are";
        return `${first} ${connector} ${verb} ${second}`;
    };

    const handleAddWord = () => {
        if (inputName === wordInputs[0].value) setFirstSubject([...firstSubject, input]);
        else setSecondSubject([...secondSubject, input]);
        setInput("");
    }

    const saveToFile = () => {
        const blob = new Blob([result], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "file.txt");
    }

    useEffect(() => {
        const phrase = makePhrase(firstWords, secondWords, position);
        setResult(phrase);
    }, [firstWords, secondWords, position]);

    return (
        <Center>
            <Stack>
                <Space h="lg"/>
                <Center>
                    <Title>{result}</Title>
                </Center>
                <Group>
                    <MultiSelect value={firstWords}
                                 onChange={setFirstWords}
                                 className={styles.select}
                                 data={firstSubject}
                                 label="Выберите первое слово (а)"/>
                    <Radio.Group name="position"
                                 label="Положение"
                                 value={position}
                                 onChange={setPosition}>
                        <Group mt="xs">
                            {positions.map((pos) => <Radio value={pos} label={pos}/>)}
                        </Group>
                    </Radio.Group>
                    <MultiSelect value={secondWords}
                                 onChange={setSecondWords}
                                 className={styles.select}
                                 data={secondSubject}
                                 label="Выберите второе слово (а)"/>
                </Group>
                <Button onClick={saveToFile}>Сохранить в файл</Button>
                <Stack>
                    <TextInput value={input}
                               onChange={(event) => setInput(event.currentTarget.value)}
                               label="Добавить к набору"/>
                    <SegmentedControl
                        value={inputName}
                        onChange={setInputName}
                        data={wordInputs}/>
                    <Button onClick={handleAddWord}>Добавить</Button>
                </Stack>
            </Stack>
        </Center>
    );
}
