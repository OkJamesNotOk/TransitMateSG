import { StyleSheet } from 'react-native';

import COLORS from './colors';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },

  modalText: {
    color: COLORS.text,
    marginTop: 12,
  },
});

export default styles;