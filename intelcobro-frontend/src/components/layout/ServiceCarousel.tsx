'use client'

import React, { useState } from 'react'

interface Service {
  id: number
  icon: string
  title: string
  description: string
  details: string
}

const services: Service[] = [
  {
    id: 1,
    icon: '💳',
    title: 'Compra de Cartera',
    description: 'Adquisición segura de acuerdo al mercado y cumplimiento normativo',
    details: 'Evaluamos y adquirimos carteras de crédito con estrictos estándares de calidad'
  },
  {
    id: 2,
    icon: '📊',
    title: 'Gestión de Cobranzas',
    description: 'Cobros efectivos con tecnología especializada',
    details: 'Utilizamos IA y machine learning para optimizar los procesos de cobranza'
  },
  {
    id: 3,
    icon: '📞',
    title: 'Contact Center',
    description: 'Personal capacitado en servicio al cliente',
    details: 'Equipo especializado en atención personalizada y resolución de conflictos'
  },
  {
    id: 4,
    icon: '🏭',
    title: 'Fábrica de Crédito',
    description: 'Procesamiento ágil y digitalización',
    details: 'Automatización de procesos crediticios con tecnología de vanguardia'
  }
]

export const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Función para obtener el índice anterior (circular)
  const getPrevIndex = () => {
    return currentIndex === 0 ? services.length - 1 : currentIndex - 1
  }

  // Función para obtener el índice siguiente (circular)
  const getNextIndex = () => {
    return currentIndex === services.length - 1 ? 0 : currentIndex + 1
  }

  // Función para renderizar una card
  const renderCard = (service: Service, position: 'left' | 'center' | 'right', index: number) => {
    const isCenter = position === 'center'
    
    const cardStyle = {
      backgroundColor: 'white',
      color: 'var(--primary-dark)',
      borderRadius: '0px 30px 0px 30px',
      padding: '2.5rem 2rem',
      height: '280px',
      width: '340px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: isCenter 
        ? '0 15px 35px rgba(0,0,0,0.25)' 
        : '0 8px 20px rgba(0,0,0,0.15)',
      border: '1px solid rgba(0,0,0,0.1)',
      transition: 'all 0.4s ease',
      transform: isCenter 
        ? 'scale(1.1) translateZ(0)' 
        : 'scale(0.9) translateZ(-50px)',
      opacity: isCenter ? 1 : 0.6,
      filter: isCenter ? 'blur(0px)' : 'blur(2px)',
      zIndex: isCenter ? 10 : 5,
      cursor: isCenter ? 'default' : 'pointer',
      position: 'absolute' as const,
      left: position === 'left' ? '0%' : 
            position === 'center' ? '50%' : '100%',
      transformOrigin: 'center',
      marginLeft: position === 'left' ? '0' :
                  position === 'center' ? '-150px' : '-300px'
    }

    return (
      <div
        key={`${service.id}-${position}`}
        style={cardStyle}
        onClick={() => {
          if (!isCenter) {
            setCurrentIndex(index)
          }
        }}
      >
        <div style={{ 
          fontSize: isCenter ? '3.5rem' : '3rem', 
          marginBottom: '1.5rem',
          transition: 'all 0.4s ease'
        }}>
          {service.icon}
        </div>
        
        <h3 style={{ 
          fontSize: isCenter ? '1.8rem' : '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: 'var(--primary-dark)',
          textAlign: 'center',
          transition: 'all 0.4s ease'
        }}>
          {service.title}
        </h3>
        
        <p style={{ 
          fontSize: isCenter ? '1rem' : '0.9rem', 
          maxWidth: '250px',
          lineHeight: '1.5',
          textAlign: 'center',
          transition: 'all 0.4s ease',
          opacity: isCenter ? 1 : 0.8
        }}>
          {service.description}
        </p>
      </div>
    )
  }

  return (
    <div className="text-center" style={{ color: 'var(--primary-dark)' }}>
      <h2 style={{ 
        fontSize: '3rem', 
        fontWeight: 'bold', 
        marginBottom: '3rem',
        color: 'var(--primary-dark)'
      }}>
        Nuestros Servicios
      </h2>
      
      {/* Carousel Container */}
      <div style={{
        position: 'relative',
        width: '900px',
        height: '400px',
        margin: '0 auto',
        padding: '2rem',
        perspective: '1000px'
      }}>
        
        {/* Cards Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Card Izquierda */}
          {renderCard(services[getPrevIndex()], 'left', getPrevIndex())}
          
          {/* Card Central */}
          {renderCard(services[currentIndex], 'center', currentIndex)}
          
          {/* Card Derecha */}
          {renderCard(services[getNextIndex()], 'right', getNextIndex())}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: 'var(--primary-dark)',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 20
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.1)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: 'var(--primary-dark)',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 20
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.1)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)'
            ;(e.target as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          ›
        </button>

        {/* Dots Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px'
        }}>
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentIndex 
                  ? 'var(--primary-dark)' 
                  : 'rgba(0,0,0,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}