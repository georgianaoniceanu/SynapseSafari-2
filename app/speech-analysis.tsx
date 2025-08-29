
import React, { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import DrawerMenu from '../components/DrawerMenu';
import HeaderBar from '../components/HeaderBar';
import SpeechAnalysisScreen from '../screens/SpeechAnalysisScreen';

export default function SpeechAnalysisPage() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	return (
		<View style={styles.container}>
			<HeaderBar onMenuPress={() => setDrawerOpen(true)} title="Speech Analysis" showBack />
			<View style={styles.contentWrapper}>
				<SpeechAnalysisScreen />
			</View>
			<Modal
				visible={drawerOpen}
				animationType="slide"
				transparent
				onRequestClose={() => setDrawerOpen(false)}
			>
				<Pressable style={styles.overlay} onPress={() => setDrawerOpen(false)} />
				<View style={styles.drawerContainer}>
					<DrawerMenu onClose={() => setDrawerOpen(false)} currentRoute="/speech-analysis" />
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
	contentWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
