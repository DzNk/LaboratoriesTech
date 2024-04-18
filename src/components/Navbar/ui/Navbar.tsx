import {AppShell, Group} from "@mantine/core";
import {Link} from "react-router-dom";
import styles from "components/Navbar/styles/Navbar.module.scss"

export function Navbar() {
    const links = [
        {title: "Главная", href: "/"},
        {title: "Калькулятор", href: "/lab1"},
        {title: "Лабораторная работа №2", href: "/lab2"},
        {title: "Лабораторная работа №3", href: "/lab3"},
        {title: "Лабораторная работа №4", href: "/lab4"},
        {title: "Лабораторная работа №5", href: "/lab5"},
        {title: "Лабораторная работа №6", href: "/lab6"},
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