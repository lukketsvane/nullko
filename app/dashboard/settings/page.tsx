// app/dashboard/settings/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [userSettings, setUserSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    language: 'en',
    phoneNumber: '',
  })

  const [storeSettings, setStoreSettings] = useState({
    storeName: '',
    storeDescription: '',
    storeTheme: 'light',
    allowWalkIns: true,
    maxQueueSize: '50',
    estimatedWaitTime: '15',
  })

  const { toast } = useToast()

  const handleUserSettingsChange = (key: string, value: any) => {
    setUserSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleStoreSettingsChange = (key: string, value: any) => {
    setStoreSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={userSettings.emailNotifications}
              onCheckedChange={(value) => handleUserSettingsChange('emailNotifications', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications">SMS Notifications</Label>
            <Switch
              id="sms-notifications"
              checked={userSettings.smsNotifications}
              onCheckedChange={(value) => handleUserSettingsChange('smsNotifications', value)}
            />
          </div>
          {userSettings.smsNotifications && (
            <div className="flex items-center space-x-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                value={userSettings.phoneNumber}
                onChange={(e) => handleUserSettingsChange('phoneNumber', e.target.value)}
                placeholder="+1234567890"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={userSettings.darkMode}
              onCheckedChange={(value) => handleUserSettingsChange('darkMode', value)}
            />
          </div>
          <div>
            <Label htmlFor="language">Language</Label>
            <Select value={userSettings.language} onValueChange={(value) => handleUserSettingsChange('language', value)}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Store Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="store-name">Store Name</Label>
            <Input
              id="store-name"
              value={storeSettings.storeName}
              onChange={(e) => handleStoreSettingsChange('storeName', e.target.value)}
              placeholder="Enter store name"
            />
          </div>
          <div>
            <Label htmlFor="store-description">Store Description</Label>
            <Textarea
              id="store-description"
              value={storeSettings.storeDescription}
              onChange={(e) => handleStoreSettingsChange('storeDescription', e.target.value)}
              placeholder="Enter store description"
            />
          </div>
          <div>
            <Label htmlFor="store-theme">Store Theme</Label>
            <Select value={storeSettings.storeTheme} onValueChange={(value) => handleStoreSettingsChange('storeTheme', value)}>
              <SelectTrigger id="store-theme">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="allow-walk-ins">Allow Walk-ins</Label>
            <Switch
              id="allow-walk-ins"
              checked={storeSettings.allowWalkIns}
              onCheckedChange={(value) => handleStoreSettingsChange('allowWalkIns', value)}
            />
          </div>
          <div>
            <Label htmlFor="max-queue-size">Maximum Queue Size</Label>
            <Input
              id="max-queue-size"
              type="number"
              value={storeSettings.maxQueueSize}
              onChange={(e) => handleStoreSettingsChange('maxQueueSize', e.target.value)}
              placeholder="Enter maximum queue size"
            />
          </div>
          <div>
            <Label htmlFor="estimated-wait-time">Estimated Wait Time (minutes)</Label>
            <Input
              id="estimated-wait-time"
              type="number"
              value={storeSettings.estimatedWaitTime}
              onChange={(e) => handleStoreSettingsChange('estimatedWaitTime', e.target.value)}
              placeholder="Enter estimated wait time"
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveSettings} className="w-full">Save All Settings</Button>
    </div>
  )
}