import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: '#2C1E16',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4AF37',
          borderRadius: '50%',
          border: '1.5px solid #D4AF37',
          fontWeight: 'bold',
          fontFamily: 'serif'
        }}
      >
        RC
      </div>
    ),
    { ...size }
  )
}
