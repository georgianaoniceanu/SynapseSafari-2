
import React, { useState } from 'react';
import { Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import DrawerMenu from '../components/DrawerMenu';
import HeaderBar from '../components/HeaderBar';
import GamesScreen from '../screens/GamesScreen';

export default function GamesPage() {
	const [drawerOpen, setDrawerOpen] = useState(false);
		return (
			<View style={styles.container}>
				<HeaderBar onMenuPress={() => setDrawerOpen(true)} title="Games" />
				<ScrollView contentContainerStyle={styles.scrollContent} style={{ flex: 1 }}>
					<GamesScreen />
				</ScrollView>
				<Modal
					visible={drawerOpen}
					animationType="slide"
					transparent
					onRequestClose={() => setDrawerOpen(false)}
				>
					<Pressable style={styles.overlay} onPress={() => setDrawerOpen(false)} />
					<View style={styles.drawerContainer}>
						<DrawerMenu onClose={() => setDrawerOpen(false)} currentRoute="/games" />
					</View>
				</Modal>
			</View>
		);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f8fc',
	},
		scrollContent: {
			flexGrow: 1,
			paddingVertical: 24,
			alignItems: 'center',
			justifyContent: 'flex-start',
			marginTop: Platform.OS === 'web' ? 32 : 0,
		},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.08)',
		zIndex: 1,
	},
	drawerContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: 320,
		zIndex: 2,
		backgroundColor: 'transparent',
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 8,
	},
});
