import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { usePayslips } from '../context/PayslipContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../utils/theme';
import { formatDate } from '../utils/date';
import { copyAssetToDownloads } from '../utils/file';

type Props = {
  route: RouteProp<RootStackParamList, 'PayslipDetails'>;
};

export default function PayslipDetailsScreen({ route }: Props) {
  const { payslips } = usePayslips();
  const payslip = payslips.find(p => p.id === route.params.payslipId);

  if (!payslip) {
    return (
      <View style={styles.errorContainer}>
        <Text
          style={styles.errorText}
          accessibilityRole="text"
          accessibilityLabel="Error: Payslip not found"
        >
          Payslip not found
        </Text>
      </View>
    );
  }

  const isPDF = payslip.file.endsWith('.pdf');
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.card}>
        <View style={styles.headerSection}>
          <Text
            style={styles.heading}
            accessibilityRole="header"
            accessibilityLabel="Payslip Details"
          >
            Payslip Details
          </Text>
          <View style={styles.badge}>
            <Text
              style={styles.badgeText}
              accessibilityLabel={`File type: ${isPDF ? 'PDF' : 'Image'}`}
            >
              {isPDF ? 'PDF' : 'IMG'}
            </Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Payslip ID</Text>
            <Text
              style={styles.value}
              accessibilityLabel={`Payslip ID: ${payslip.id}`}
            >
              {payslip.id}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.label}>Period Start</Text>
            <Text
              style={styles.value}
              accessibilityLabel={`Period starts: ${formatDate(
                payslip.fromDate,
              )}`}
            >
              {formatDate(payslip.fromDate)}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.label}>Period End</Text>
            <Text
              style={styles.value}
              accessibilityLabel={`Period ends: ${formatDate(payslip.toDate)}`}
            >
              {formatDate(payslip.toDate)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => copyAssetToDownloads(payslip.file)}
          accessibilityRole="button"
          accessibilityLabel={`Download payslip ${payslip.id} as ${
            isPDF ? 'PDF' : 'image'
          } file`}
          accessibilityHint="Downloads the payslip file to your device"
          activeOpacity={0.8}
        >
          <Text style={styles.downloadButtonText}>Download Payslip</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: typography.body,
    color: colors.error,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  heading: {
    fontSize: typography.heading,
    fontWeight: 'bold',
    color: colors.primary,
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
  detailsSection: {
    marginBottom: spacing.xl,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: typography.label,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },
  value: {
    fontSize: typography.body,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
  },
  downloadButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  downloadButtonText: {
    color: colors.background,
    fontSize: typography.body,
    fontWeight: 'bold',
  },
});
