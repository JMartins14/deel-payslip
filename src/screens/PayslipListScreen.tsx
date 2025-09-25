import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { usePayslips } from '../context/PayslipContext';
import { formatDateRange } from '../utils/date';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../utils/theme';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Payslips'>;
};

const ItemSeparator = () => <View style={styles.separator} />;

export default function PayslipListScreen({ navigation }: Props) {
  const { payslips } = usePayslips();

  const renderPayslipItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('PayslipDetails', { payslipId: item.id })
      }
      accessibilityRole="button"
      accessibilityLabel={`Payslip for period ${formatDateRange(
        item.fromDate,
        item.toDate,
      )}`}
      accessibilityHint="Tap to view payslip details"
      activeOpacity={0.7}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.periodText}>
          {formatDateRange(item.fromDate, item.toDate)}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {item.file.endsWith('.pdf') ? 'PDF' : 'Image'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={payslips}
        keyExtractor={item => item.id}
        renderItem={renderPayslipItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="List of payslips"
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  listContainer: {
    paddingBottom: spacing.xl,
  },
  item: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  periodText: {
    fontSize: typography.title,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  badgeText: {
    color: colors.background,
    fontSize: typography.caption,
    fontWeight: 'bold',
  },
  separator: {
    height: spacing.md,
  },
});
