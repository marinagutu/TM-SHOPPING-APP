import { View, StyleSheet, Text, TextStyle } from "react-native";
import { STYLES } from "../../constants";

type FieldProps = {
  title: string;
  titleStyle?: TextStyle;
  description: string;
  descriptionStyle?: TextStyle;
};

const Field = ({
  title,
  description,
  titleStyle,
  descriptionStyle,
}: FieldProps) => {
  return (
    <View>
      <Text style={{ ...styles.textTitle, ...titleStyle }}>{title}</Text>
      <Text style={{ ...styles.textDescription, ...descriptionStyle }}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    ...STYLES.textPrimary,
    marginVertical: 10,
  },
  textDescription: {
    ...STYLES.textSecondary,
    marginVertical: 0,
  },
});

export default Field;
