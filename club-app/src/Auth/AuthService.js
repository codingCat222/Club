import { authService } from '../services/auth.service'
import { storage } from '../utils/storage'
import { LOCAL_STORAGE_KEYS, USER_ROLES } from '../utils/constants'

class AuthManager {
  // Check if user is authenticated
  isAuthenticated() {
    return authService.isAuthenticated()
  }

  // Get current user
  getCurrentUser() {
    return authService.getCurrentUser()
  }

  // Get auth token
  getToken() {
    return authService.getToken()
  }

  // Check if user has specific role
  hasRole(role) {
    const user = this.getCurrentUser()
    return user?.role === role
  }

  // Check if user is admin
  isAdmin() {
    return this.hasRole(USER_ROLES.ADMIN)
  }

  // Check if user is staff
  isStaff() {
    return this.hasRole(USER_ROLES.STAFF)
  }

  // Check if user is club owner
  isClubOwner() {
    return this.hasRole(USER_ROLES.CLUB_OWNER)
  }

  // Check if user is customer
  isCustomer() {
    return this.hasRole(USER_ROLES.CUSTOMER)
  }

  // Login user
  async login(email, password) {
    try {
      const response = await authService.login(email, password)
      return {
        success: true,
        data: response
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      }
    }
  }

  // Register user
  async register(userData) {
    try {
      const response = await authService.register(userData)
      return {
        success: true,
        data: response
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      }
    }
  }

  // Logout user
  async logout() {
    try {
      await authService.logout()
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      // Force logout even if API call fails
      storage.remove(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
      storage.remove(LOCAL_STORAGE_KEYS.USER_DATA)
      return { success: true }
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const response = await authService.refreshToken()
      return {
        success: true,
        data: response
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Token refresh failed'
      }
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await authService.forgotPassword(email)
      return {
        success: true,
        data: response
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Password reset request failed'
      }
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await authService.resetPassword(token, newPassword)
      return {
        success: true,
        data: response
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Password reset failed'
      }
    }
  }

  // Update user profile in storage
  updateUserProfile(userData) {
    const currentUser = this.getCurrentUser()
    const updatedUser = { ...currentUser, ...userData }
    storage.set(LOCAL_STORAGE_KEYS.USER_DATA, updatedUser)
    return updatedUser
  }

  // Get user permissions based on role
  getUserPermissions() {
    const user = this.getCurrentUser()
    const basePermissions = ['view_clubs', 'place_orders', 'view_profile']

    if (!user) return basePermissions

    const rolePermissions = {
      [USER_ROLES.CUSTOMER]: [...basePermissions],
      [USER_ROLES.STAFF]: [...basePermissions, 'manage_orders', 'scan_qr'],
      [USER_ROLES.CLUB_OWNER]: [...basePermissions, 'manage_club', 'view_reports'],
      [USER_ROLES.ADMIN]: [...basePermissions, 'manage_all', 'view_all_reports', 'manage_users']
    }

    return rolePermissions[user.role] || basePermissions
  }

  // Check if user has specific permission
  hasPermission(permission) {
    const permissions = this.getUserPermissions()
    return permissions.includes(permission)
  }
}

// Create singleton instance
const authManager = new AuthManager()

export default authManager