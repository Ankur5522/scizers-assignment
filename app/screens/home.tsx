import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList, StatusBar } from "react-native";
import UserCard from "../components/userCard";
import User from "../../assets/interface/userInterface";

const Home = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            Array.from({ length: 10 }, async (_, i) => {
                data[i].profileImage = `https://i.pravatar.cc/150?img=${i + 1}`;
            });
            setUsers(data);
        }
        fetchUsers();
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerText}>User Directory</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <UserCard user={item} />}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        width: "100%",
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: "#36454F",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#DDDDDD",
    },
    listContainer: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    }
});