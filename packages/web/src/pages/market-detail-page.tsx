import { useState, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import { createApiClient } from "@/lib/api"
import {
  type DeviceId,
  type DevicePresetId,
  PurchaseCard,
  DeviceSelector,
  DimensionSelector,
  PreviewToolbar,
  DevicePresetTabs,
  PhonePreview,
  LoadingSkeleton,
  ErrorState,
} from "@/components/market-detail"

const api = createApiClient()

const MIN_ZOOM = 25
const MAX_ZOOM = 200
const ZOOM_STEP = 15
const DEFAULT_ZOOM = 65

interface MarketDetailPageProps {
  id: string
}

export function MarketDetailPage({ id }: MarketDetailPageProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceId>("mobile")
  const [selectedDimension, setSelectedDimension] = useState(0)
  const [selectedPreset, setSelectedPreset] = useState<DevicePresetId>("iphone14")
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM))
  }, [])

  const handleResetZoom = useCallback(() => {
    setZoom(DEFAULT_ZOOM)
  }, [])

  const { data, isLoading, error } = useQuery({
    queryKey: ["marketplace", "listing", id],
    queryFn: () => api.getMarketplaceListing(id),
  })

  const listing = data?.listing

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error || !listing) {
    return <ErrorState />
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Sidebar - Purchase Info & Controls */}
      <aside className="w-72 shrink-0 border-r border-border bg-card flex flex-col overflow-y-auto">
        {/* Purchase Card */}
        <PurchaseCard listing={listing} />

        {/* Device Selection */}
        <div className="p-4 space-y-6">
          <DeviceSelector selectedDevice={selectedDevice} onDeviceChange={setSelectedDevice} />
          <DimensionSelector
            selectedIndex={selectedDimension}
            onDimensionChange={setSelectedDimension}
          />
        </div>
      </aside>

      {/* Main Content - Preview Area */}
      <main className="flex-1 flex flex-col bg-background relative overflow-hidden">
        {/* Top Toolbar */}
        <PreviewToolbar
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
        />

        {/* Device Preset Tabs */}
        <DevicePresetTabs selectedPreset={selectedPreset} onPresetChange={setSelectedPreset} />

        {/* Canvas Preview Area */}
        <PhonePreview listing={listing} zoom={zoom} />
      </main>
    </div>
  )
}
