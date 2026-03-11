import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

export default function UsersModal({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.35)",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 16,
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Users Management
          </Text>
          <Text>This is a placeholder modal.</Text>
          <Text style={{ opacity: 0.7 }}>
            Later you can add CRUD/list of users here.
          </Text>

          <Pressable
            onPress={onClose}
            style={{
              padding: 12,
              backgroundColor: "#222",
              borderRadius: 8,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Close
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
