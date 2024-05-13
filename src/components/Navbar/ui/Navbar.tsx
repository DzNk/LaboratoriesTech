import {AppShell, Group} from "@mantine/core";
import {Link} from "react-router-dom";
import styles from "components/Navbar/styles/Navbar.module.scss"

export function Navbar() {
    const links = [
        {title: "Главная", href: "/"},
        {title: "Калькулятор", href: "/lab1"},
        {title: "Секундомер", href: "/lab2"},
        {title: "Генератор фраз", href: "/lab3"},
        {title: "Множества", href: "/lab4"},
        {title: "Два списка", href: "/lab5"},
        {title: "Блокнот", href: "/lab6"},
        {title: "Лабораторная работа №7", href: "/lab7"},
    ];

    return (
        <AppShell.Header className={styles.navbar}>
            <Group h="100%" justify="center">
                {
                    links.map(link => {
                            return (
                                <Link className={styles.link}
                                      key={link.title}
                                      to={link.href}>
                                    {link.title}
                                </Link>
                            );
                        }
                    )
                }
            </Group>
        </AppShell.Header>
    )
}