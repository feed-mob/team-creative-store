import { Link } from "@tanstack/react-router"

interface PreviewToolbarProps {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
}

export function PreviewToolbar({ zoom, onZoomIn, onZoomOut, onResetZoom }: PreviewToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-2 px-6 py-3 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-1">
        <Link
          to="/market"
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors mr-2"
          title="Back to Marketplace"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <button
          type="button"
          className="p-2 text-primary bg-primary/10 rounded-lg transition-colors"
          title="Toggle Grid"
        >
          <span className="material-symbols-outlined">grid_4x4</span>
        </button>
        <button
          type="button"
          onClick={onZoomOut}
          disabled={zoom <= 25}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Zoom Out"
        >
          <span className="material-symbols-outlined">zoom_out</span>
        </button>
        <button
          type="button"
          onClick={onZoomIn}
          disabled={zoom >= 200}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Zoom In"
        >
          <span className="material-symbols-outlined">zoom_in</span>
        </button>
        <button
          type="button"
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          title="Fullscreen"
        >
          <span className="material-symbols-outlined">fullscreen</span>
        </button>
        <div className="w-px h-6 bg-border mx-2" />
        <button
          type="button"
          onClick={onResetZoom}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          title="Reset Zoom"
        >
          Zoom: {zoom}%
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
          <div className="size-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
            JD
          </div>
          <div className="size-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
            AS
          </div>
          <div className="size-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
            +4
          </div>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-bold hover:bg-muted/70 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">share</span>
          <span>Share Preview</span>
        </button>
      </div>
    </div>
  )
}
