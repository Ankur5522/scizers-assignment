import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, StatusBar, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import UserCard from "../components/userCard";
import User from "../../assets/interface/userInterface";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Home = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [originalUsers, setOriginalUsers] = useState<User[]>([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            Array.from({ length: 10 }, async (_, i) => {
                data[i].profileImage = `https://i.pravatar.cc/150?img=${i + 1}`;
            });
            setUsers(data);
            setOriginalUsers(data);
            } catch (error) {
                setError("Failed to fetch users");
                console.error("Failed to fetch users:", error);
            }
        }
        fetchUsers();
    }, [])

    const handleSearch = (value: string) => {
        if (value.length > 1) {
            const filteredUsers = originalUsers.filter((user) => {
                return user.name.toLowerCase().includes(value.toLowerCase());
            });
            setUsers(filteredUsers);
        } else {
            setUsers(originalUsers);
        }
    }

    const handleFilter = (key: keyof User) => {
        const sortedUsers = users.sort((a, b) => {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }
            return 0;
        });
        setUsers([...sortedUsers]);
        setShowPopUp(() => !showPopUp);
    }

    const ErrorScreen = () => {
        return (
            <View style={styles.container}>
                <View style={{ 
                    width: "100%", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    marginTop: 10, 
                    marginHorizontal: "auto" 
                }}>
                    <Text style={{fontSize: 17, fontWeight:"bold", color: '#AAAAAA'}}>{error ? error : "No Users"}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerText}>User Directory</Text>
            </View>
            <View style={styles.actionsContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search users..."
                        style={styles.searchInput}
                        onChangeText={handleSearch}
                    />
                </View>
                <TouchableWithoutFeedback onPress={() => setShowPopUp(!showPopUp)}>
                    <FontAwesome name="sort" size={24} color="black" />
                </TouchableWithoutFeedback>
                {showPopUp && (
                    <View style={styles.popUp}>
                        <TouchableOpacity onPress={() => handleFilter('name')}>
                            <Text style={[styles.popUpText, {borderBottomWidth: 1, borderBottomColor: '#DDDDDD'}]}>By name</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFilter('email')}>
                            <Text style={styles.popUpText}>By email</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {users.length > 0 ? (
                <View style={styles.listContainer}>
                    <FlatList
                        data={users}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <UserCard user={item} />}
                        contentContainerStyle={styles.listContent}
                    />
                </View>
            ) : (
                <ErrorScreen />
            )}
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
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },
    searchContainer: {
        flex: 1,
        marginRight: 15,
    },
    searchInput: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 10,
        width: "100%",
    },
    popUp: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2
    },
    overlay: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popUpText: {
        fontSize: 16,
        padding: 10,
    },
    listContainer: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    }
});