/**
 * Nitro Sound records Android → `.mp4` (AAC), iOS → `.m4a`.
 * Multipart `type` / `name` must match real format or STT APIs may reject the file.
 */
export function getAudioMultipartDescriptor(uri: string): { uri: string; name: string; type: string } {
  const path = uri.split('?')[0].toLowerCase();
  if (path.endsWith('.wav')) {
    return { uri, name: 'recording.wav', type: 'audio/wav' };
  }
  if (path.endsWith('.m4a')) {
    return { uri, name: 'recording.m4a', type: 'audio/mp4' };
  }
  if (path.endsWith('.mp4')) {
    return { uri, name: 'recording.mp4', type: 'audio/mp4' };
  }
  if (path.endsWith('.aac')) {
    return { uri, name: 'recording.aac', type: 'audio/aac' };
  }
  if (path.endsWith('.3gp')) {
    return { uri, name: 'recording.3gp', type: 'audio/3gpp' };
  }
  if (path.endsWith('.caf')) {
    return { uri, name: 'recording.caf', type: 'audio/x-caf' };
  }
  return { uri, name: 'recording.mp4', type: 'audio/mp4' };
}
