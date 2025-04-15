import React, { useState } from 'react';
import {
  Settings,
  Mail,
  Shield,
  Globe,
  Bell,
  Palette,
  Lock,
  Key,
  FileText,
  Calendar,
  Save,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface SystemSettings {
  branding: {
    siteName: string;
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    darkMode: boolean;
  };
  email: {
    provider: string;
    fromEmail: string;
    fromName: string;
    templates: {
      welcome: boolean;
      verification: boolean;
      passwordReset: boolean;
      notification: boolean;
    };
  };
  security: {
    twoFactorAuth: boolean;
    passwordPolicy: {
      minLength: number;
      requireNumbers: boolean;
      requireSymbols: boolean;
      requireUppercase: boolean;
    };
    sessionTimeout: number;
    maxLoginAttempts: number;
  };
  notifications: {
    email: boolean;
    inApp: boolean;
    desktop: boolean;
    digest: 'never' | 'daily' | 'weekly';
  };
  maintenance: {
    enabled: boolean;
    message: string;
    scheduledStart?: Date;
    scheduledEnd?: Date;
  };
  localization: {
    defaultLanguage: string;
    availableLanguages: string[];
    dateFormat: string;
    timeFormat: '12h' | '24h';
    timezone: string;
  };
  privacy: {
    termsLastUpdated: Date;
    privacyPolicyLastUpdated: Date;
    cookieConsent: boolean;
    dataRetention: number;
  };
}

// Mock data
const mockSettings: SystemSettings = {
  branding: {
    siteName: 'CYBER_NET',
    logo: '/logo.svg',
    primaryColor: '#0ff',
    secondaryColor: '#b026ff',
    darkMode: true
  },
  email: {
    provider: 'SendGrid',
    fromEmail: 'noreply@cybernet.dev',
    fromName: 'CYBER_NET',
    templates: {
      welcome: true,
      verification: true,
      passwordReset: true,
      notification: true
    }
  },
  security: {
    twoFactorAuth: true,
    passwordPolicy: {
      minLength: 12,
      requireNumbers: true,
      requireSymbols: true,
      requireUppercase: true
    },
    sessionTimeout: 30,
    maxLoginAttempts: 5
  },
  notifications: {
    email: true,
    inApp: true,
    desktop: true,
    digest: 'daily'
  },
  maintenance: {
    enabled: false,
    message: 'System maintenance in progress. Please check back later.',
    scheduledStart: new Date('2024-04-01T02:00:00'),
    scheduledEnd: new Date('2024-04-01T04:00:00')
  },
  localization: {
    defaultLanguage: 'en',
    availableLanguages: ['en', 'es', 'fr', 'de', 'ja'],
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '24h',
    timezone: 'UTC'
  },
  privacy: {
    termsLastUpdated: new Date('2024-01-01'),
    privacyPolicyLastUpdated: new Date('2024-01-01'),
    cookieConsent: true,
    dataRetention: 90
  }
};

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings>(mockSettings);
  const [activeTab, setActiveTab] = useState<
    'branding' | 'email' | 'security' | 'notifications' | 'maintenance' | 'localization' | 'privacy'
  >('branding');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'branding':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Site Name</label>
              <input
                type="text"
                value={settings.branding.siteName}
                onChange={(e) => setSettings({
                  ...settings,
                  branding: { ...settings.branding, siteName: e.target.value }
                })}
                className="cyber-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Logo URL</label>
              <input
                type="text"
                value={settings.branding.logo}
                onChange={(e) => setSettings({
                  ...settings,
                  branding: { ...settings.branding, logo: e.target.value }
                })}
                className="cyber-input w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Primary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.branding.primaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      branding: { ...settings.branding, primaryColor: e.target.value }
                    })}
                    className="cyber-input w-12 h-9 p-1"
                  />
                  <input
                    type="text"
                    value={settings.branding.primaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      branding: { ...settings.branding, primaryColor: e.target.value }
                    })}
                    className="cyber-input flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Secondary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.branding.secondaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      branding: { ...settings.branding, secondaryColor: e.target.value }
                    })}
                    className="cyber-input w-12 h-9 p-1"
                  />
                  <input
                    type="text"
                    value={settings.branding.secondaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      branding: { ...settings.branding, secondaryColor: e.target.value }
                    })}
                    className="cyber-input flex-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.branding.darkMode}
                  onChange={(e) => setSettings({
                    ...settings,
                    branding: { ...settings.branding, darkMode: e.target.checked }
                  })}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  settings.branding.darkMode ? 'bg-neon-blue' : 'bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    settings.branding.darkMode ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
                <span className="text-sm text-gray-400">Enable Dark Mode by Default</span>
              </label>
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email Provider</label>
                <select
                  value={settings.email.provider}
                  onChange={(e) => setSettings({
                    ...settings,
                    email: { ...settings.email, provider: e.target.value }
                  })}
                  className="cyber-input w-full"
                >
                  <option value="SendGrid">SendGrid</option>
                  <option value="Mailgun">Mailgun</option>
                  <option value="AWS SES">AWS SES</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">From Email</label>
                <input
                  type="email"
                  value={settings.email.fromEmail}
                  onChange={(e) => setSettings({
                    ...settings,
                    email: { ...settings.email, fromEmail: e.target.value }
                  })}
                  className="cyber-input w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">From Name</label>
              <input
                type="text"
                value={settings.email.fromName}
                onChange={(e) => setSettings({
                  ...settings,
                  email: { ...settings.email, fromName: e.target.value }
                })}
                className="cyber-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-3">Email Templates</label>
              <div className="space-y-2">
                {Object.entries(settings.email.templates).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: {
                          ...settings.email,
                          templates: {
                            ...settings.email.templates,
                            [key]: e.target.checked
                          }
                        }
                      })}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border ${
                      value
                        ? 'bg-neon-blue/20 border-neon-blue'
                        : 'border-gray-400'
                    } rounded transition-colors`}>
                      {value && <CheckCircle className="w-3 h-3 text-neon-blue" />}
                    </div>
                    <span className="text-sm text-gray-400">
                      {key.charAt(0).toUpperCase() + key.slice(1)} Template
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, twoFactorAuth: e.target.checked }
                  })}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  settings.security.twoFactorAuth ? 'bg-neon-blue' : 'bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    settings.security.twoFactorAuth ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
                <span className="text-sm text-gray-400">Require Two-Factor Authentication</span>
              </label>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-3">Password Policy</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Minimum Length</label>
                  <input
                    type="number"
                    value={settings.security.passwordPolicy.minLength}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: {
                          ...settings.security.passwordPolicy,
                          minLength: parseInt(e.target.value)
                        }
                      }
                    })}
                    className="cyber-input w-full"
                    min="8"
                    max="32"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireNumbers}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: {
                          ...settings.security.passwordPolicy,
                          requireNumbers: e.target.checked
                        }
                      }
                    })}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border ${
                    settings.security.passwordPolicy.requireNumbers
                      ? 'bg-neon-blue/20 border-neon-blue'
                      : 'border-gray-400'
                  } rounded transition-colors`}>
                    {settings.security.passwordPolicy.requireNumbers && (
                      <CheckCircle className="w-3 h-3 text-neon-blue" />
                    )}
                  </div>
                  <span className="text-sm text-gray-400">Require Numbers</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireSymbols}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: {
                          ...settings.security.passwordPolicy,
                          requireSymbols: e.target.checked
                        }
                      }
                    })}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border ${
                    settings.security.passwordPolicy.requireSymbols
                      ? 'bg-neon-blue/20 border-neon-blue'
                      : 'border-gray-400'
                  } rounded transition-colors`}>
                    {settings.security.passwordPolicy.requireSymbols && (
                      <CheckCircle className="w-3 h-3 text-neon-blue" />
                    )}
                  </div>
                  <span className="text-sm text-gray-400">Require Symbols</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireUppercase}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: {
                          ...settings.security.passwordPolicy,
                          requireUppercase: e.target.checked
                        }
                      }
                    })}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border ${
                    settings.security.passwordPolicy.requireUppercase
                      ? 'bg-neon-blue/20 border-neon-blue'
                      : 'border-gray-400'
                  } rounded transition-colors`}>
                    {settings.security.passwordPolicy.requireUppercase && (
                      <CheckCircle className="w-3 h-3 text-neon-blue" />
                    )}
                  </div>
                  <span className="text-sm text-gray-400">Require Uppercase</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                  })}
                  className="cyber-input w-full"
                  min="5"
                  max="1440"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Max Login Attempts</label>
                <input
                  type="number"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, maxLoginAttempts: parseInt(e.target.value) }
                  })}
                  className="cyber-input w-full"
                  min="3"
                  max="10"
                />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, email: e.target.checked }
                  })}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  settings.notifications.email ? 'bg-neon-blue' : 'bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    settings.notifications.email ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
                <span className="text-sm text-gray-400">Email Notifications</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.inApp}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, inApp: e.target.checked }
                  })}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  settings.notifications.inApp ? 'bg-neon-blue' : 'bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    settings.notifications.inApp ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
                <span className="text-sm text-gray-400">In-App Notifications</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.desktop}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, desktop: e.target.checked }
                  })}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  settings.notifications.desktop ? 'bg-neon-blue' : 'bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    settings.notifications.desktop ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
                <span className="text-sm text-gray-400">Desktop Notifications</span>
              </label>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Notification Digest</label>
              <select
                value={settings.notifications.digest}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    digest: e.target.value as SystemSettings['notifications']['digest']
                  }
                })}
                className="cyber-input w-full"
              >
                <option value="never">Never</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenance.enabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    maintenance: { ...settings.maintenance, enabled: e.target.checked }
                  })}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  settings.maintenance.enabled ? 'bg-neon-blue' : 'bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    settings.maintenance.enabled ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
                <span className="text-sm text-gray-400">Enable Maintenance Mode</span>
              </label>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Maintenance Message</label>
              <textarea
                value={settings.maintenance.message}
                onChange={(e) => setSettings({
                  ...settings,
                  maintenance: { ...settings.maintenance, message: e.target.value }
                })}
                className="cyber-input w-full h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Scheduled Start</label>
                <input
                  type="datetime-local"
                  value={settings.maintenance.scheduledStart?.toISOString().slice(0, 16)}
                  onChange={(e) => setSettings({
                    ...settings,
                    maintenance: {
                      ...settings.maintenance,
                      scheduledStart: new Date(e.target.value)
                    }
                  })}
                  className="cyber-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Scheduled End</label>
                <input
                  type="datetime-local"
                  value={settings.maintenance.scheduledEnd?.toISOString().slice(0, 16)}
                  onChange={(e) => setSettings({
                    ...settings,
                    maintenance: {
                      ...settings.maintenance,
                      scheduledEnd: new Date(e.target.value)
                    }
                  })}
                  className="cyber-input w-full"
                />
              </div>
            </div>
          </div>
        );

      case 'localization':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Default Language</label>
                <select
                  value={settings.localization.defaultLanguage}
                  onChange={(e) => setSettings({
                    ...settings,
                    localization: { ...settings.localization, defaultLanguage: e.target.value }
                  })}
                  className="cyber-input w-full"
                >
                  {settings.localization.availableLanguages.map(lang => (
                    <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Time Format</label>
                <select
                  value={settings.localization.timeFormat}
                  onChange={(e) => setSettings({
                    ...settings,
                    localization: {
                      ...settings.localization,
                      timeFormat: e.target.value as '12h' | '24h'
                    }
                  })}
                  className="cyber-input w-full"
                >
                  <option value="12h">12-hour</option>
                  <option value="24h">24-hour</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Date Format</label>
              <select
                value={settings.localization.dateFormat}
                onChange={(e) => setSettings({
                  ...settings,
                  localization: { ...settings.localization, dateFormat: e.target.value }
                })}
                className="cyber-input w-full"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Timezone</label>
              <select
                value={settings.localization.timezone}
                onChange={(e) => setSettings({
                  ...settings,
                  localization: { ...settings.localization, timezone: e.target.value }
                })}
                className="cyber-input w-full"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-3">Available Languages</label>
              <div className="flex flex-wrap gap-2">
                {settings.localization.availableLanguages.map(lang => (
                  <div
                    key={lang}
                    className="px-2 py-0.5 rounded-full text-xs font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                  >
                    {lang.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.cookieConsent}
                  onChange={(e) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, cookieConsent: e.target.checked }
                  })}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  settings.privacy.cookieConsent ? 'bg-neon-blue' : 'bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    settings.privacy.cookieConsent ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
                <span className="text-sm text-gray-400">Require Cookie Consent</span>
              </label>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Data Retention (days)</label>
              <input
                type="number"
                value={settings.privacy.dataRetention}
                onChange={(e) => setSettings({
                  ...settings,
                  privacy: { ...settings.privacy, dataRetention: parseInt(e.target.value) }
                })}
                className="cyber-input w-full"
                min="30"
                max="365"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Terms Last Updated</label>
                <input
                  type="date"
                  value={settings.privacy.termsLastUpdated.toISOString().slice(0, 10)}
                  onChange={(e) => setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      termsLastUpdated: new Date(e.target.value)
                    }
                  })}
                  className="cyber-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Privacy Policy Last Updated</label>
                <input
                  type="date"
                  value={settings.privacy.privacyPolicyLastUpdated.toISOString().slice(0, 10)}
                  onChange={(e) => setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      privacyPolicyLastUpdated: new Date(e.target.value)
                    }
                  })}
                  className="cyber-input w-full"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="cyber-heading text-2xl">System Settings</h1>
          <p className="text-gray-400">Configure platform settings and preferences</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="cyber-button"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <div className={`cyber-card p-3 ${
          saveStatus === 'success'
            ? 'bg-green-500/10 border-green-500/20'
            : 'bg-red-500/10 border-red-500/20'
        }`}>
          <div className="flex items-center gap-2">
            {saveStatus === 'success' ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-500">Settings saved successfully</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-500">Failed to save settings</span>
              </>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <button
            onClick={() => setActiveTab('branding')}
            className={`w-full flex items-center gap-2 p-2 rounded ${
              activeTab === 'branding'
                ? 'bg-neon-blue/20 text-neon-blue'
                : 'text-gray-400 hover:bg-cyber-primary/30'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Branding</span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`w-full flex items-center gap-2 p-2 rounded ${
              activeTab === 'email'
                ? 'bg-neon-blue/20 text-neon-blue'
                : 'text-gray-400 hover:bg-cyber-primary/30'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-2 p-2 rounded ${
              activeTab === 'security'
                ? 'bg-neon-blue/20 text-neon-blue'
                : 'text-gray-400 hover:bg-cyber-primary/30'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-2 p-2 rounded ${
              activeTab === 'notifications'
                ? 'bg-neon-blue/20 text-neon-blue'
                : 'text-gray-400 hover:bg-cyber-primary/30'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => setActiveTab('maintenance')}
            className={`w-full flex items-center gap-2 p-2 rounded ${
              activeTab === 'maintenance'
                ? 'bg-neon-blue/20 text-neon-blue'
                : 'text-gray-400 hover:bg-cyber-primary/30'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Maintenance</span>
          </button>

          <button
            onClick={() => setActiveTab('localization')}
            className={`w-full flex items-center gap-2 p-2 rounded ${
              activeTab === 'localization'
                ? 'bg-neon-blue/20 text-neon-blue'
                : 'text-gray-400 hover:bg-cyber-primary/30'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Localization</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full flex items-center gap-2 p-2 rounded ${
              activeTab === 'privacy'
                ? 'bg-neon-blue/20 text-neon-blue'
                : 'text-gray-400 hover:bg-cyber-primary/30'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacy</span>
          </button>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 cyber-card p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}