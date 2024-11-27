import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardTypeOptions } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Registro = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [codigoPostal, setCP] = useState("");
    const [estado, setEstado] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [colonia, setColonia] = useState("");
    const [calle, setCalle] = useState("");                       
    const [numint, setNumInt] = useState("");
    const [numext, setNumExt] = useState("");
    const [telefono, setTelefono] = useState("");
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

    const handleRegister = () => {
        setIsSubmitting(true);
        setError("");

        if (!nombre || !apellido || !codigoPostal || !correo || !contrasena) {
            setError("Todos los campos obligatorios deben completarse.");
            setIsSubmitting(false);
            return;
        }

        console.log("Formulario enviado");
        setIsSubmitting(false);
    };

    const renderInputField = (
        label: string,
        placeholder: string,
        value: string,
        setValue: React.Dispatch<React.SetStateAction<string>>,
        icon: keyof typeof Entypo.glyphMap,
        keyboardType: KeyboardTypeOptions = 'default'
    ) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <Entypo name={icon} size={20} color="#999" style={styles.icon} />
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={setValue}
                    style={styles.input}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.header}>Regístrate</Text>
                <Text style={styles.subheader}>Déjanos conocerte</Text>

                {renderInputField("Nombre:", "Ingrese su nombre", nombre, setNombre, "user")}
                {renderInputField("Apellido:", "Ingrese su apellido", apellido, setApellido, "user")}
                {renderInputField("Código Postal:", "Ingrese su Código Postal", codigoPostal, setCP, "home", "numeric")}
                {renderInputField("Estado:", "Estado autorrellenable", estado, setEstado, "home")}
                {renderInputField("Municipio:", "Municipio autorrellenable", municipio, setMunicipio, "home")}
                {renderInputField("Colonia:", "Seleccione su colonia", colonia, setColonia, "home")}
                {renderInputField("Calle:", "Ingrese su calle", calle, setCalle, "home")}
                {renderInputField("Número Interior:", "Opcional", numint, setNumInt, "home", "numeric")}
                {renderInputField("Número Exterior:", "Ingrese su número exterior", numext, setNumExt, "home", "numeric")}
                {renderInputField("Teléfono:", "Ingrese su número telefónico", telefono, setTelefono, "phone", "phone-pad")}
                {renderInputField("Usuario:", "Ingrese su nombre de usuario", usuario, setUsuario, "user")}
                {renderInputField("Correo:", "Ingrese su correo electrónico", correo, setCorreo, "mail", "email-address")}

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña:</Text>
                    <View style={styles.inputWrapper}>
                        <Entypo name="lock" size={20} color="#999" style={styles.icon} />
                        <TextInput
                            placeholder="Ingrese su contraseña"
                            value={contrasena}
                            onChangeText={setContrasena}
                            style={styles.input}
                            secureTextEntry={!mostrarContrasenia}
                        />
                        <TouchableOpacity onPress={() => setMostrarContrasenia(!mostrarContrasenia)}>
                            <Entypo name={mostrarContrasenia ? "eye" : "eye-with-line"} size={20} color="#999" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={handleRegister}
                    disabled={isSubmitting}
                >
                    <Text style={styles.btnLoginText}>{isSubmitting ? "Enviando..." : "Registrarse"}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#F3CCAA', // Fondo similar al color de la imagen
        padding: 20,
        borderRadius: 10,
        width: '100%',
        maxWidth: 500,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    subheader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
    },
    error: {
        color: 'red',
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',
    },
    btnLogin: {
        backgroundColor: 'rgb(139, 101, 30)', // Color de fondo en RGB
        paddingVertical: 8, // Espacio vertical
        borderRadius: 10, // Radio de los bordes
        alignItems: 'center', // Alineación horizontal de contenido
        justifyContent: 'center', // Alineación vertical de contenido
        width: '45%', // Ancho del botón
        marginVertical: '2%', // Margen vertical
        height: 50, // Altura del botón
    },
    btnLoginText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Registro;
