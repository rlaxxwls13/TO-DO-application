import { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

/**
 * 색상 견본(Swatch)
 * @param {*} detail
 * @param {*} col 열 개수
 * @param {*} onPress 선택시 이벤트, 전달 값: 색 Hex 값
 * @param {*} selectedState 선택시 적용될 React State
 * @returns
 */
export function ColorSwatch({ detail = 2, col = 5, onPress = () => {}, selectedState }) {
  const [swatch, setSwatch] = useState([]);
  const [selected, setSelected] = selectedState;

  useEffect(() => {
    let res = [];
    const weight = 255 / detail;
    let [r, g, b] = [255, 0, 0];
    let colColors = [];
    colColors.push(rgbToHex(r, g, b));
    const tmp = 255 / col;
    for (let j = 1; j < col; j++) {
      colColors.push(rgbToHex(r, g + tmp * j, b + tmp * j));
    }
    res.push(colColors);
    for (let i = 0; i < 5; i++) {
      const w = i % 2 === 0 ? weight : -weight;
      for (let c = 0; c < 255; c += weight) {
        switch (i % 3) {
          case 0:
            g += w;
            break;
          case 1:
            r += w;
            break;
          case 2:
            b += w;
            break;
        }
        let colColors = [];
        colColors.push(rgbToHex(r, g, b));
        const [weiR, weiG, weiB] = [(255 - r) / col, (255 - g) / col, (255 - b) / col];
        for (let j = 1; j < col; j++) {
          colColors.push(rgbToHex(r + weiR * j, g + weiG * j, b + weiB * j));
        }
        res.push(colColors);
      }
    }
    setSwatch(res);
  }, []);

  return (
    <View style={styles.addWindow}>
      <View style={styles.swatch}>
        {swatch.map((colColor, i) => (
          <View style={styles.col} key={i}>
            {colColor.map((color, j) => (
              <TouchableOpacity
                style={{ ...styles.color, backgroundColor: color, borderWidth: selected === color ? 3 : 0 }}
                onPress={() => {
                  setSelected(color);
                  onPress(color);
                }}
                key={j}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  swatch: {
    flexDirection: "row",
    backgroundColor: "#fcfcfc",
    padding: 5,
    borderRadius: 5,
  },

  col: {
    flexDirection: "column",
    marginHorizontal: 2,
  },

  color: {
    width: 30,
    height: 30,
    marginVertical: 2,
    borderRadius: 10,
  },
});

function toHex(c) {
  const hex = Math.round(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
