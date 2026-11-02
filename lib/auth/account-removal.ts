export function accountRemovalSuccessMessage(email: string, storyCount: number) {
  const stories =
    storyCount <= 0
      ? 'No submitted stories were linked to this account.'
      : storyCount === 1
        ? '1 submitted story was kept with its current review or published status.'
        : `${storyCount} submitted stories were kept with their current review or published status.`;

  return `Removed account ${email}. They can no longer sign in. ${stories}`;
}
