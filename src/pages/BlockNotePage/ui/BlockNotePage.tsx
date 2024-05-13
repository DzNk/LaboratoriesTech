import {Button, Center, FileButton, Group, SegmentedControl, Space, Stack, Textarea, TextInput} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {WeekDayNote} from "pages/BlockNotePage/types/blockNoteTypes.ts";
import {saveAs} from "file-saver";

const weekdays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

export function BlockNotePage() {
    const [weekDay, setWeekDay] = useState<string>(weekdays[0]);
    const [currentNote, setCurrentNote] = useState<string>("");
    const [notes, setNotes] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const indexRef = useRef<number>(0);

    const [weekDayNotes, setWeekDayNotes] = useState<WeekDayNote[]>(weekdays.map((day) => ({weekDay: day, notes: []})));

    const addNote = () => {
        setNotes([...notes, currentNote]);
        setCurrentNote("");
    }

    const saveToFile = () => {
        const blob = new Blob([JSON.stringify(weekDayNotes)], {type: "application/json"});
        saveAs(blob, "state.json");
    }

    const readFromFile = (file: File) => {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            try {
                const result = event.target?.result;
                if (typeof result === 'string') {
                    const notes: WeekDayNote[] = JSON.parse(result);
                    setWeekDayNotes(notes);
                    setNotes(notes[indexRef.current].notes);
                }
            } catch (error) {
                alert("Error parsing file:");
            }
        };

        reader.onerror = () => {
            alert("Error reading the file:");
        };

        reader.readAsText(file);
    };

    useEffect(() => {
        if (file === null) return;
        readFromFile(file);
    }, [file]);

    useEffect(() => {
        weekDayNotes[indexRef.current] = {weekDay: weekdays[indexRef.current], notes: notes};
        indexRef.current = weekdays.indexOf(weekDay);
        setNotes(weekDayNotes[indexRef.current].notes);
    }, [weekDay]);

    console.log(weekDayNotes);

    return (
        <Center>
            <Stack gap={"xs"}>
                <Space h={'"lg'}/>
                <Group grow>
                    <Button onClick={() => saveToFile()}>Сохранить в файл</Button>
                    <FileButton onChange={setFile} accept="application/json">
                        {(props) => <Button {...props}>Загрузить из файла</Button>}
                    </FileButton>
                </Group>
                <SegmentedControl
                    value={weekDay}
                    onChange={setWeekDay}
                    data={weekdays.map((day) => ({label: day, value: day}))}
                />
                <Textarea rows={12} value={notes.join("\n")}/>
                <TextInput value={currentNote}
                           size="lg"
                           onChange={(event) => setCurrentNote(event.currentTarget.value)}/>
                <Group grow>
                    <Button onClick={addNote}>Добавить запись</Button>
                </Group>
            </Stack>
        </Center>);
}