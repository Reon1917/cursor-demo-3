import { db } from './index';
import { users, professionals } from './schema';
import { eq } from 'drizzle-orm';

export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  role: 'athlete' | 'trainer' | 'nutritionist';
};

export type UpdateUserProfileParams = {
  dateOfBirth?: Date;
  weight?: number;
  height?: number;
  description?: string;
};

export async function createUser(params: CreateUserParams) {
  try {
    const [user] = await db.insert(users).values(params).returning();
    
    // If the user is a professional (trainer or nutritionist), create professional profile
    if (params.role !== 'athlete') {
      await db.insert(professionals).values({
        userId: user.id,
        professionalType: params.role,
      });
    }
    
    return { user, error: null };
  } catch (error) {
    console.error('Error creating user:', error);
    return { user: null, error };
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
      with: {
        professional: true,
      },
    });
    return { user, error: null };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { user: null, error };
  }
}

export async function updateUserProfile(clerkId: string, params: UpdateUserProfileParams) {
  try {
    const [user] = await db
      .update(users)
      .set(params)
      .where(eq(users.clerkId, clerkId))
      .returning();
    return { user, error: null };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { user: null, error };
  }
}

export async function deleteUser(clerkId: string) {
  try {
    const [user] = await db
      .delete(users)
      .where(eq(users.clerkId, clerkId))
      .returning();
    return { user, error: null };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { user: null, error };
  }
} 