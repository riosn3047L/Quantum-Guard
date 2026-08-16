const inMemoryDb = { leaderboard: {} };

export function saveResult(hostname, data) {
  inMemoryDb.leaderboard[hostname] = data;
}

export function getLeaderboard() {
  return Object.values(inMemoryDb.leaderboard).sort((a, b) => b.score - a.score);
}
