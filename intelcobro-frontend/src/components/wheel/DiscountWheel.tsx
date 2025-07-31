'use client'

// @ts-nocheck
import React, { useState, useRef } from 'react'

export const DiscountWheel = ({ onResult }) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)

  const sections = [
    { id: 1, label: '5% OFF', angle: 0, color: '#D62336' },
    { id: 2, label: '10% OFF', angle: 60, color: '#798553' },
    { id: 3, label: '15% OFF', angle: 120, color: '#D62336' },
    { id: 4, label: '¡Intenta de nuevo!', angle: 180, color: '#6b7280' },
    { id: 5, label: '20% OFF', angle: 240, color: '#798553' },
    { id: 6, label: 'Sin premio', angle: 300, color: '#6b7280' },
  ]

  const spinWheel = async () => {
    if (isSpinning) return

    setIsSpinning(true)
    
    // Calcular rotación aleatoria (mínimo 3 vueltas completas)
    const minSpins = 3
    const maxSpins = 6
    const spins = Math.random() * (maxSpins - minSpins) + minSpins
    const finalAngle = Math.random() * 360
    const totalRotation = rotation + (spins * 360) + finalAngle

    setRotation(totalRotation)

    // Simular petición al backend
    try {
      setTimeout(() => {
        // Determinar qué sección ganó basándose en el ángulo final
        const normalizedAngle = (360 - (finalAngle % 360)) % 360
        const sectionAngle = 60 // 360/6 secciones
        const winningIndex = Math.floor(normalizedAngle / sectionAngle)
        
        // Asegurar que el índice esté dentro del rango válido
        const safeWinningIndex = Math.max(0, Math.min(winningIndex, sections.length - 1))
        const winningSection = sections[safeWinningIndex] || sections[0]

        const result = {
          id: Date.now().toString(),
          section: winningSection.label,
          discount: winningSection.label.includes('%') ? 
            parseInt(winningSection.label.match(/\d+/)?.[0] || '0') : 0,
          isWinning: winningSection.label.includes('%'),
          message: winningSection.label.includes('%') ? 
            `¡Felicitaciones! Ganaste ${winningSection.label}` :
            winningSection.label,
          angle: finalAngle,
          spinDuration: 3000
        }

        setIsSpinning(false)
        if (onResult) {
          onResult(result)
        }
      }, 3000)
    } catch (error) {
      console.error('Error spinning wheel:', error)
      setIsSpinning(false)
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '2rem',
      padding: '2rem'
    }}>
      <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
        🎯 Rueda de Descuentos
      </h3>
      
      <div style={{ position: 'relative', width: '300px', height: '300px' }}>
        {/* Wheel Container */}
        <div
          ref={wheelRef}
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            position: 'relative',
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
            background: 'conic-gradient(from 0deg, #D62336 0deg 60deg, #798553 60deg 120deg, #D62336 120deg 180deg, #6b7280 180deg 240deg, #798553 240deg 300deg, #6b7280 300deg 360deg)',
            border: '5px solid white',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Wheel Sections with Text */}
          {sections.map((section, index) => (
            <div
              key={section.id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '140px',
                height: '2px',
                transformOrigin: '0 0',
                transform: `rotate(${section.angle + 30}deg) translateX(40px)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                transform: 'rotate(-90deg)',
                whiteSpace: 'nowrap'
              }}>
                {section.label}
              </span>
            </div>
          ))}
        </div>

        {/* Wheel Pointer */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '25px solid white',
          zIndex: 10,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
        }} />

        {/* Center Circle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60px',
          height: '60px',
          backgroundColor: 'var(--primary-dark)',
          borderRadius: '50%',
          border: '3px solid white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          zIndex: 10
        }}>
          🎲
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        style={{
          backgroundColor: isSpinning ? '#6b7280' : 'var(--primary-green)',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '25px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: isSpinning ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}
      >
        {isSpinning ? 'Girando...' : '🎯 ¡GIRAR RUEDA!'}
      </button>

      <p style={{ 
        color: 'rgba(255,255,255,0.8)', 
        fontSize: '0.9rem', 
        textAlign: 'center',
        maxWidth: '300px',
        lineHeight: '1.4'
      }}>
        ¡Gira la rueda y obtén descuentos exclusivos en nuestros servicios!
      </p>
    </div>
  )
}