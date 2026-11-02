import { describe, expect, it } from 'vitest';
import { accountRemovalSuccessMessage } from '@/lib/auth/account-removal';
import { getTableConfig } from 'drizzle-orm/pg-core';
import { stories } from '@/lib/db/schema';

describe('account removal keeps stories', () => {
  it('tells admins that submitted stories were kept', () => {
    expect(accountRemovalSuccessMessage('bot@example.com', 0)).toContain(
      'No submitted stories were linked'
    );
    expect(accountRemovalSuccessMessage('mentor@uni-due.de', 1)).toContain(
      '1 submitted story was kept'
    );
    expect(accountRemovalSuccessMessage('mentor@uni-due.de', 3)).toContain(
      '3 submitted stories were kept'
    );
  });

  it('does not cascade-delete stories when a user row is removed', () => {
    const config = getTableConfig(stories);
    const userId = config.columns.find((column) => column.name === 'user_id');
    const onDelete = (userId as { onDelete?: string } | undefined)?.onDelete;
    expect(onDelete === undefined || onDelete === 'no action' || onDelete === 'set null').toBe(true);
    expect(onDelete).not.toBe('cascade');
  });
});
