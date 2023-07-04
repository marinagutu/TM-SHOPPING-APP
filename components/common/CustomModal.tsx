import React, { ReactNode } from "react";
import { Modal, StyleSheet, View } from "react-native";
import ButtonComponent from "./ButtonComponent";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  buttonTitle: string;
  // Add any additional props here
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
  buttonTitle,
}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalBox}>
          <View>{children}</View>
          <View>
            <ButtonComponent
              title={buttonTitle}
              action={onClose}
              style={{
                marginVertical: 10,
                paddingHorizontal: 30,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 300,
    height: 300,
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default CustomModal;
