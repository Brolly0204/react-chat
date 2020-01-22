export function getChatID(userId, targetId) {
  return [userId, targetId].sort().join('_')
}
