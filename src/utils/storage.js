import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { storage } from '../firebase';

export const uploadInStorage = async (image, userId) => {
  if (!image) return 'no image provided';
  if (!userId) return 'no userId provided';

  const randomId = nanoid();
  const imageRef = ref(storage, `user:${userId}/${image.name + randomId}`);
  await uploadBytes(imageRef, image);
  const url = await getDownloadURL(imageRef);

  return url;
};
