import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import User from "../../assets/interface/userInterface";
import { Link, useRouter } from "expo-router";

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const router = useRouter();
    return (
        <Link href={{
            pathname: '/screens/profile',
            params: { user: JSON.stringify(user) },
        }}
            onPress={() => router.push('/screens/profile')}
        >
        <View style={styles.userCard}>
            <Image source={{ uri: user.profileImage }} style={styles.userAvatar} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
            </View>
        </View>
        </Link>
    );
};

const styles = StyleSheet.create({
    userCard: {
        backgroundColor: "#f8f9fa",
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    userAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        color: "#333",
    },
    userEmail: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
});

export default UserCard;