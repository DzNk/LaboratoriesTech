import {Accordion, Button, Center, FileButton, Group, Menu, Modal, Space, Stack, TextInput} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {Contact} from "pages/PhoneBookPage/types/phoneBookTypes.ts";
import {MantineReactTable, useMantineReactTable,} from 'mantine-react-table';
import {usePhoneBookColumns} from "pages/PhoneBookPage/hooks/usePhoneBookColumns.ts";
import {Action} from "pages/PhoneBookPage/enums/phoneBookEnums.ts";
import {saveAs} from "file-saver";

const phoneNumberPattern = /^(\+7|8)?\s?\(?\d{3}\)?\s?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

export function PhoneBookPage() {
    const [file, setFile] = useState<File | null>(null);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const {columns} = usePhoneBookColumns();
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [currentModalData, setCurrentModalData] = useState<Contact>({
        phone: "",
        details: "",
        address: "",
        surname: ""
    });
    const currentEditIndex = useRef<number>(0);
    const currentActionRef = useRef<Action>(Action.ADD);

    const processAction = () => {
        switch (currentActionRef.current) {
            case Action.ADD:
                if (currentModalData.surname === "" || currentModalData.address === ""
                    || currentModalData.phone === "" || currentModalData.details === ""
                    || !phoneNumberPattern.test(currentModalData.phone)
                ) return;
                setContacts([...contacts, currentModalData]);
                setCurrentModalData({phone: "", details: "", address: "", surname: ""});
                setEditModalVisible(false);
                break;

            case Action.EDIT:
                if (currentModalData.surname === "" || currentModalData.address === ""
                    || currentModalData.phone === "" || currentModalData.details === ""
                    || !phoneNumberPattern.test(currentModalData.phone)
                ) return;
                contacts[currentEditIndex.current] = currentModalData;
                setContacts([...contacts]);
                setEditModalVisible(false);
                break;

            case Action.DELETE:
                setContacts(contacts.filter((_, index) => index !== currentEditIndex.current));
                setEditModalVisible(false);
                break;
        }
    }

    const saveToFile = () => {
        const blob = new Blob([JSON.stringify(contacts)], {type: "application/json"});
        saveAs(blob, "contacts.json");
    };

    const readFromFile = (file: File) => {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            try {
                const result = event.target?.result;
                if (typeof result === 'string') {
                    const contacts: Contact[] = JSON.parse(result);
                    setContacts(contacts);
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

    const sortContacts = () => {
        const sorted = [...contacts].sort((a, b) => a.surname.localeCompare(b.surname));
        setContacts(sorted);
    };


    const table = useMantineReactTable({
        columns,
        data: contacts,
        enableColumnFilters: false,
        enableHiding: false,
        enableDensityToggle: false,
        enableRowActions: true,
        mantinePaginationProps: {
            showRowsPerPage: false,
        },
        paginationDisplayMode: 'pages',
        displayColumnDefOptions: {
            'mrt-row-actions': {
                header: 'Действия'
            }
        },
        renderRowActionMenuItems: ({row}) => (
            <>
                <Menu.Item onClick={() => {
                    currentEditIndex.current = row.index;
                    currentActionRef.current = Action.EDIT;
                    setCurrentModalData(row.original);
                    setEditModalVisible(true);
                }}>Изменить</Menu.Item>
                <Menu.Item onClick={() => {
                    currentEditIndex.current = row.index;
                    currentActionRef.current = Action.DELETE;
                    processAction();
                }}>Удалить</Menu.Item>
            </>
        ),
    });

    return (
        <>
            <Modal opened={editModalVisible}
                   onClose={() => setEditModalVisible(false)}>
                <Stack>
                    <TextInput value={currentModalData.surname}
                               onChange={(event) => setCurrentModalData({
                                   ...currentModalData,
                                   surname: event.currentTarget.value
                               })}
                               label={"Фамилия"}/>
                    <TextInput value={currentModalData.address}
                               onChange={(event) => setCurrentModalData({
                                   ...currentModalData,
                                   address: event.currentTarget.value
                               })}
                               label={"Адрес"}/>
                    <TextInput value={currentModalData.phone}
                               onChange={(event) => setCurrentModalData({
                                   ...currentModalData,
                                   phone: event.currentTarget.value
                               })}
                               error={currentModalData.phone !== "" && !phoneNumberPattern.test(currentModalData.phone)}
                               label={"Телефон"}/>
                    <TextInput value={currentModalData.details}
                               onChange={(event) => setCurrentModalData({
                                   ...currentModalData,
                                   details: event.currentTarget.value
                               })}
                               label={"Детали"}/>
                    <Button onClick={processAction}>Ок</Button>
                </Stack>
            </Modal>
            <Center>
                <Stack w={"60%"}>
                    <Space h={"xs"}/>
                    <Group grow>
                        <Accordion variant="contained">
                            <Accordion.Item key="load" value="load">
                                <Accordion.Control>Файл</Accordion.Control>
                                <Accordion.Panel>
                                    <Button onClick={saveToFile} w={"100%"}>Сохранить файл</Button>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <FileButton onChange={setFile} accept="application/json">
                                        {(props) => <Button w={"100%"} {...props}>Загрузить из файла</Button>}
                                    </FileButton>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion variant="contained">
                            <Accordion.Item key="edit" value="edit">
                                <Accordion.Control>Редактировать</Accordion.Control>
                                <Accordion.Panel>
                                    <Button w={"100%"}
                                            onClick={() => {
                                                setEditModalVisible(true);
                                                setCurrentModalData({phone: "", details: "", address: "", surname: ""});
                                                currentActionRef.current = Action.ADD;
                                            }}>
                                        Добавить запись
                                    </Button>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Button onClick={sortContacts} w={"100%"}>Отсортировать записи</Button>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Group>
                    <MantineReactTable table={table}/>
                </Stack>
            </Center>
        </>
    );
}