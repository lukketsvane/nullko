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

export default function StoreConfigPage() {
  const [storeName, setStoreName] = useState('')
  const [storeDescription, setStoreDescription] = useState('')
  const [storeTheme, setStoreTheme] = useState('light')
  const [allowWalkIns, setAllowWalkIns] = useState(true)
  const [maxQueueSize, setMaxQueueSize] = useState('50')
  const [estimatedWaitTime, setEstimatedWaitTime] = useState('15')
  const { toast } = useToast()

  const handleSaveConfig = () => {
    // Here you would typically save the configuration to your backend
    toast({
      title: "Store configuration saved",
      description: "Your store settings have been successfully updated.",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Store Configuration</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input
              id="store-name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Enter store name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-description">Store Description</Label>
            <Textarea
              id="store-description"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              placeholder="Enter store description"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={storeTheme} onValueChange={setStoreTheme}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Queue Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="allow-walk-ins">Allow Walk-ins</Label>
            <Switch
              id="allow-walk-ins"
              checked={allowWalkIns}
              onCheckedChange={setAllowWalkIns}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-queue-size">Maximum Queue Size</Label>
            <Input
              id="max-queue-size"
              type="number"
              value={maxQueueSize}
              onChange={(e) => setMaxQueueSize(e.target.value)}
              placeholder="Enter maximum queue size"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimated-wait-time">Estimated Wait Time (minutes)</Label>
            <Input
              id="estimated-wait-time"
              type="number"
              value={estimatedWaitTime}
              onChange={(e) => setEstimatedWaitTime(e.target.value)}
              placeholder="Enter estimated wait time"
            />
          </div>
        </CardContent>
      </Card>
      <Button onClick={handleSaveConfig} className="mt-6">
        Save Configuration
      </Button>
    </div>
  )
}