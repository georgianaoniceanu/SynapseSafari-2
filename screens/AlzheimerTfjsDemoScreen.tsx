import React, { useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Only works on web!
export default function AlzheimerTfjsDemoScreen() {
  const [modelUrl, setModelUrl] = useState('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v2_1.0_224/model.json');
  const [lastConvName, setLastConvName] = useState('block_16_project_BN');
  const [modelStatus, setModelStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [predictions, setPredictions] = useState<string[]>([]);
  const [meta, setMeta] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [model, setModel] = useState<any>(null);
  const [inputSize, setInputSize] = useState(224);

  // @ts-ignore
  const tf = typeof window !== 'undefined' ? (window as any).tf : null;

  async function handleLoadModel() {
    if (!tf) return setModelStatus('TensorFlow.js nu este disponibil');
    setModelStatus('Se încarcă modelul…');
    setLoading(true);
    try {
      let loadedModel;
      try {
        loadedModel = await tf.loadLayersModel(modelUrl);
      } catch (e) {
        loadedModel = await tf.loadGraphModel(modelUrl);
      }
      setModel(loadedModel);
      const inShape = loadedModel.inputs?.[0]?.shape || [];
      const sizeFromModel = inShape?.[1] && inShape?.[2] ? inShape[1] : 224;
      setInputSize(sizeFromModel);
      setModelStatus(`Model încărcat. Intrare: ${inShape}. Dimensiune: ${sizeFromModel}×${sizeFromModel}`);
    } catch (err) {
      setModelStatus('Eroare la încărcarea modelului.');
    }
    setLoading(false);
  }

  function handleFileChange(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setPredictions([]);
    setMeta('');
  }

  async function handlePredict() {
    if (!tf || !model) return setModelStatus('Încărcați modelul mai întâi!');
    setLoading(true);
    setModelStatus('Se rulează predicția…');
    try {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = inputSize;
        canvas.height = inputSize;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setModelStatus('Eroare: nu se poate obține contextul canvas');
          setLoading(false);
          return;
        }
        ctx.drawImage(img, 0, 0, inputSize, inputSize);
        let t = tf.browser.fromPixels(canvas, 3);
        t = t.toFloat().div(255).expandDims(0);
        const logits = model.predict(t);
        const probs = (Array.isArray(logits) ? logits[0] : logits).softmax();
        const data = await probs.data();
        setPredictions(Array.from(data).map((p: any, i: number) => `Clasa ${i}: ${(p * 100).toFixed(2)}%`));
        setMeta(`Intrare: ${inputSize}×${inputSize}×3 · Normalizare: 0‑1`);
        probs.dispose();
        tf.dispose(logits);
        tf.dispose(t);
        setModelStatus('');
      };
      img.src = imageUrl;
    } catch (e) {
      setModelStatus('Eroare la predicție.');
    }
    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Analiză poze CT pentru depistarea Alzheimer (demo educațional)</Text>
      <Text style={styles.text}>Această pagină rulează TensorFlow.js local în browser. Nu este un dispozitiv medical.</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>1) Încărcați modelul</Text>
        <TextInput style={styles.input} value={modelUrl} onChangeText={setModelUrl} placeholder="URL model TF.js" />
        <TextInput style={styles.input} value={lastConvName} onChangeText={setLastConvName} placeholder="Nume strat conv. pt. Grad-CAM (opțional)" />
        <TouchableOpacity style={styles.button} onPress={handleLoadModel} disabled={loading}>
          <Text style={styles.buttonText}>Încarcă modelul</Text>
        </TouchableOpacity>
        <Text style={styles.status}>{modelStatus}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>2) Încărcați imagine CT</Text>
        {Platform.OS === 'web' && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ marginBottom: 12 }}
            onChange={handleFileChange}
          />
        )}
        {imageUrl ? <img src={imageUrl} alt="CT" style={{ width: 180, height: 180, borderRadius: 12, marginBottom: 12, border: '2px solid #d32f2f' }} /> : null}
        <TouchableOpacity style={styles.button} onPress={handlePredict} disabled={loading || !imageUrl || !model}>
          <Text style={styles.buttonText}>Rulează predicția</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>3) Rezultate</Text>
        {predictions.map((p, i) => (
          <Text key={i} style={styles.prediction}>{p}</Text>
        ))}
        <Text style={styles.meta}>{meta}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#f5f8fc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 18,
  },
  card: {
    width: 370,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#2563eb',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: '#f8fafc',
  },
  button: {
    backgroundColor: '#2d7be5',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    fontSize: 13,
    color: '#d32f2f',
    marginTop: 6,
    textAlign: 'center',
  },
  prediction: {
    fontSize: 15,
    color: '#2563eb',
    marginVertical: 2,
  },
  meta: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
});
