import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';

export async function requestStoragePermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;

  if (Platform.Version < 29) {
    try {
      const readGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to read files from your storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      const writeGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to save files to your storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      return (
        readGranted === PermissionsAndroid.RESULTS.GRANTED &&
        writeGranted === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.error('Permission request error:', err);
      return false;
    }
  }

  return true;
}

export async function copyAssetToDownloads(fileName: string) {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Storage permission is required to download payslips. Please grant permission in app settings.',
      );
      return;
    }

    const path =
      Platform.OS === 'android'
        ? RNBlobUtil.fs.dirs.DownloadDir + '/' + fileName
        : RNBlobUtil.fs.dirs.DocumentDir + '/' + fileName;

    const downloadDest = await getUniqueFilePath(path);

    const assetPath = RNBlobUtil.fs.asset(fileName);

    await RNBlobUtil.fs
      .cp(assetPath, downloadDest)
      .then(() => {
        Alert.alert('Download Complete', `File saved to ${downloadDest}`);
        openFile(downloadDest, getMimeType(fileName));
      })
      .catch(error => {
        console.error('Failed to download file:', error);

        Alert.alert(
          'Unable to Download File',
          'An error occurred while trying to download the file.',
        );
      });
  } catch (error) {
    console.error('Failed to download file:', error);
    Alert.alert(
      'Unable to Download File',
      'An error occurred while trying to download the file.',
    );
  }
}

export async function openFile(filePath: string, mimeType: string) {
  try {
    const exists = await RNBlobUtil.fs.exists(filePath);
    if (!exists) {
      Alert.alert(
        'Unable to Open File',
        'An error occurred while trying to open the file.',
      );
      return;
    }

    if (Platform.OS === 'ios') {
      RNBlobUtil.ios.openDocument(filePath);
    } else if (Platform.OS === 'android') {
      await RNBlobUtil.android.actionViewIntent(filePath, mimeType);
    }
  } catch (err) {
    console.error('Failed to open file:', err);
    Alert.alert(
      'Unable to Open File',
      'An error occurred while trying to open the file.',
    );
  }
}

export function getMimeType(fileName: string) {
  const extension = fileName.split('.').pop()?.toLowerCase();
  let mimeType = 'application/octet-stream';
  switch (extension) {
    case 'jpg':
      mimeType = 'image/jpeg';
      break;
    case 'jpeg':
      mimeType = 'image/jpeg';
      break;
    case 'png':
      mimeType = 'image/png';
      break;
    case 'pdf':
      mimeType = 'application/pdf';
      break;
    default:
      mimeType = 'application/octet-stream';
  }
  return mimeType;
}

export async function getUniqueFilePath(path: string): Promise<string> {
  let counter = 1;

  const dotIndex = path.lastIndexOf('.');
  const hasExt = dotIndex !== -1;
  const name = hasExt ? path.substring(0, dotIndex) : path;
  const ext = hasExt ? path.substring(dotIndex) : '';

  while (await RNBlobUtil.fs.exists(path)) {
    path = `${name}(${counter})${ext}`;
    counter++;
  }

  return path;
}
