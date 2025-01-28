import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { supabase } from "../supabase/supabaseClient";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    age: "",
    playerRole: "",
    photo: null,
    govtId: null,
    cricHeroesURL: "",
    paymentDone: false,
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setFormData({ ...formData, photo: result.uri });
    }
  };

  const pickGovtId = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.type !== "cancel") {
      setFormData({ ...formData, govtId: result.uri });
    }
  };

  const handlePayment = () => {
    // Mock payment logic
    setFormData({ ...formData, paymentDone: true });
    Alert.alert("Payment Successful");
  };

  const handleSubmit = async () => {
    if (!formData.paymentDone) {
      Alert.alert("Please complete the payment before submitting.");
      return;
    }
  
    if (formData.age < 25 || formData.age > 45) {
      Alert.alert("Age must be between 25 and 45.");
      return;
    }
  
    try {
      const { data, error } = await supabase.from("registration_form").insert([
        {
          email: formData.email,
          full_name: formData.fullName,
          age: formData.age,
          player_role: formData.playerRole,
          photo: formData.photo,
          govt_id: formData.govtId,
          cric_heroes_url: formData.cricHeroesURL,
          payment_done: formData.paymentDone,
        },
      ]);
  
      if (error) throw error;
  
      Alert.alert("Registration Successful!");
    } catch (error) {
      console.error("Supabase Insert Error:", error);
      Alert.alert("An error occurred. Please try again.");
    }
  };
  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <Text>Full Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleInputChange("fullName", value)}
      />
      <Text>Age:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange("age", parseInt(value))}
      />
      <Text>Player Role:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleInputChange("playerRole", value)}
      />
      <TouchableOpacity onPress={pickPhoto} style={styles.button}>
        <Text>Upload Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickGovtId} style={styles.button}>
        <Text>Upload Govt ID</Text>
      </TouchableOpacity>
      <Text>CricHeroes URL:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleInputChange("cricHeroesURL", value)}
      />
      <TouchableOpacity onPress={handlePayment} style={styles.button}>
        <Text>Pay Fee</Text>
      </TouchableOpacity>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
  button: { padding: 10, backgroundColor: "lightblue", marginBottom: 10 },
});

export default RegistrationForm;