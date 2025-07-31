'use client'

import React, { CSSProperties } from 'react'

interface CircularNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

interface NavItem {
  id: string
  label: string
  color: string
  style: React.CSSProperties & {
    textOrientation?: string
  }
}

export const CircularNavigation = ({ activeSection, onSectionChange }: CircularNavigationProps) => {
  const navItems: NavItem[] = [
    { 
      id: 'inicio', 
      label: 'Inicio', 
      color: '#798553',
      style: {
        width: '180px',
        height: '180px',
        bottom: '142px',
        right: '-115px'
      }
    },
    { 
      id: 'servicios', 
      label: 'Servicios', 
      color: '#D62336',
      style: {
        width: '180px',
        height: '180px',
        transform: 'rotate(17deg)',
        top: '-114px',
        right: '91px',
        writingMode: 'sideways-lr',
        textOrientation: 'mixed'
      }
    },
    { 
      id: 'proteccion', 
      label: 'Protección de datos', 
      color: '#D62336',
      style: {
        width: '180px',
        height: '180px',
        transform: 'rotate(53deg)',
        top: '301px',
        left: '-53px',
        fontSize: '24px',
        lineHeight: '1.1',
        writingMode: 'vertical-rl',
        textOrientation: 'mixed'
      }
    },
    { 
      id: 'soluciona', 
      label: 'Soluciona tu deuda', 
      color: '#D62336',
      style: {
        writingMode: 'vertical-rl',
        width: '180px',
        height: '180px',
        transform: 'rotate(-20deg)',
        bottom: '-83px',
        left: '191px',
        fontSize: '25px',
        lineHeight: '1.1'
      }
    },
    { 
      id: 'trabaja', 
      label: 'Trabaja con nosotros', 
      color: '#798553',
      style: {
        width: '180px',
        height: '180px',
        transform: 'rotate(215deg)',
        bottom: '174px',
        left: '-102px',
        fontSize: '25px',
        lineHeight: '1.1'
      }
    }
  ]

  return (
    <div className="circular-nav">
      <div className="central-circle"></div>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`nav-circle ${activeSection === item.id ? 'active' : ''}`}
          onClick={() => onSectionChange(item.id)}
          style={{
            ...item.style,
            backgroundColor: item.color,
            cursor: 'pointer'
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}