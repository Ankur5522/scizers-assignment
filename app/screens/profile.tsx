import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import User from '../../assets/interface/userInterface';
import { useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface Profile {
    route: {
        params: {
            user: User;
        };
    };
}

const Profile: React.FC<Profile> = ({ route }) => {
    const { user } = useLocalSearchParams();
    const parsedUser = typeof user === 'string' ? JSON.parse(user) : user;
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButtonContainer}> 
                    <FontAwesome name="arrow-left" size={24} color="#DDDDDD" onPress={() => navigation.goBack()}/>
                </View>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.profileHeader}>
                <Image source={{ uri: parsedUser.profileImage }} style={styles.avatar} />
                <Text style={styles.name}>{parsedUser.name}</Text>
                <Text style={styles.username}>@{parsedUser.username}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <Text style={styles.detailText}>📧 Email: {parsedUser.email}</Text>
                <Text style={styles.detailText}>📞 Phone: {parsedUser.phone}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(`https://${parsedUser.website}`)}>
                    <Text style={[styles.detailText]}>🌐 Website: <Text style={styles.link}>{parsedUser.website}</Text></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address</Text>
                <Text style={styles.detailText}>
                    {parsedUser.address.street}, {parsedUser.address.suite}, {parsedUser.address.city}, {parsedUser.address.zipcode}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Company</Text>
                <Text style={styles.detailText}>{parsedUser.company.name}</Text>
                <Text style={styles.detailText}>💡 {parsedUser.company.catchPhrase}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8f9fa',
    },
    backButtonContainer: {
        position: 'absolute',
        left: 20,
        zIndex: 1,
    },
    header: {
        position: 'relative',
        paddingVertical: 20,
        paddingHorizontal: 15,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: "#36454F",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#DDDDDD",
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#d1d1d1',
    },
    name: {
        fontSize: 26,
        fontWeight: '600',
        color: '#333',
    },
    username: {
        fontSize: 16,
        color: '#6c757d',
    },
    section: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
        marginHorizontal: 20
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        color: '#495057',
    },
    detailText: {
        fontSize: 16,
        color: '#555',
        marginVertical: 3,
    },
    link: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});

export default Profile;
