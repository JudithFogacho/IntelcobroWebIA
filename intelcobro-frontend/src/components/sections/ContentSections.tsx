'use client'

import { useState } from 'react'
import { DiscountWheel } from '../wheel/DiscountWheel'
import { ServiceCarousel } from '../layout/ServiceCarousel'

// Definir el tipo para el resultado de la rueda
interface WheelResult {
  message: string
  isWinning: boolean
}

interface ContentSectionsProps {
  activeSection: string
}

export const ContentSections = ({ activeSection }: ContentSectionsProps) => {
  const [wheelResult, setWheelResult] = useState<WheelResult | null>(null)
  const [showWheel, setShowWheel] = useState(false)

  const handleWheelResult = (result: WheelResult) => {
    setWheelResult(result)
    setTimeout(() => {
      setShowWheel(false)
    }, 5000) // Ocultar rueda después de 5 segundos
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'inicio':
        return (
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold" style={{ margin: '3rem', paddingTop: '4rem' }}>
              Conecta con el futuro de la cobranza
            </h1>
            <div className="flex justify-center" style={{ gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-white">
                Contáctanos
              </button>
            </div>
            
            {/* Mostrar resultado de la rueda */}
            {wheelResult && (
              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                border: '2px solid white'
              }}>
                <h4 style={{ marginBottom: '0.5rem' }}>🎉 Resultado:</h4>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{wheelResult.message}</p>
                {wheelResult.isWinning && (
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    ¡Usa tu descuento en cualquiera de nuestros servicios!
                  </p>
                )}
              </div>
            )}
          </div>
        )

      case 'servicios':
        return <ServiceCarousel />

      case 'trabaja':
        return (
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">¡Destaca en Intelcobro!</h2>
            <p className="text-xl mb-8" style={{ maxWidth: '400px', lineHeight: '1.6' }}>
              Si tienes talento, confianza y ambición de llegar alto
            </p>
            <div className="card" style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: 'var(--primary-dark)', maxWidth: '400px', margin: '0 auto' }}>
              <h3 className="font-bold mb-4">Únete a nuestro equipo</h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input className="input" type="text" placeholder="Nombre completo" />
                <input className="input" type="email" placeholder="Email" />
                <input className="input" type="text" placeholder="Posición de interés" />
                <input className="input" type="file" accept=".pdf,.doc,.docx" />
                <button type="submit" className="btn btn-primary">
                  Enviar Aplicación
                </button>
              </form>
            </div>
          </div>
        )

      case 'soluciona':
        return (
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Soluciona tu Deuda</h2>
            <p className="text-xl mb-8" style={{ maxWidth: '400px', lineHeight: '1.6' }}>
              Te ayudamos a encontrar la mejor solución para tu situación financiera
            </p>
            <div className="card" style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: 'var(--primary-dark)', maxWidth: '400px', margin: '0 auto' }}>
              <h3 className="font-bold mb-4">Solicita Asesoría</h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input className="input" type="text" placeholder="Nombre" />
                <input className="input" type="email" placeholder="Email" />
                <input className="input" type="tel" placeholder="Teléfono" />
                <select className="input">
                  <option>Tipo de deuda</option>
                  <option>Tarjeta de crédito</option>
                  <option>Préstamo personal</option>
                  <option>Hipotecario</option>
                  <option>Otro</option>
                </select>
                <button type="submit" className="btn btn-primary">
                  Solicitar Asesoría
                </button>
              </form>
            </div>
          </div>
        )

      case 'proteccion':
        return (
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Protección de Datos</h2>
            <div style={{ maxWidth: '500px', textAlign: 'left' }}>
              <div className="card" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', marginBottom: '2rem' }}>
                <h3 className="font-bold mb-4">Compromiso con la Privacidad</h3>
                <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
                  En Intelcobro protegemos la información personal de nuestros clientes conforme a las mejores prácticas de la industria.
                </p>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                  <li>Cumplimiento normativo completo</li>
                  <li>Encriptación de datos sensibles</li>
                  <li>Acceso controlado y auditado</li>
                  <li>Políticas de retención claras</li>
                </ul>
              </div>
              <button className="btn btn-white">
                Ver Política Completa
              </button>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold">Bienvenido a Intelcobro</h2>
          </div>
        )
    }
  }

  return (
    <>
      {/* Contenido normal */}
      <div className="flex items-center justify-center h-full" style={{ padding: '2rem' }}>
        {renderContent()}
      </div>

      {/* Modal de la Rueda */}
      {showWheel && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'var(--primary-dark)',
            borderRadius: '20px',
            padding: '2rem',
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh'
          }}>
            <button
              onClick={() => setShowWheel(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            
            <DiscountWheel onResult={handleWheelResult} />
          </div>
        </div>
      )}
    </>
  )
}