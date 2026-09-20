import React, { useState } from 'react';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SizeChartModal({ isOpen, onClose }) {
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [recommendedSize, setRecommendedSize] = useState(null);

  if (!isOpen) return null;

  // Chart data in inches
  const sizeDataInches = [
    { size: 'XS', bust: '32 - 33', waist: '25 - 26', hip: '35 - 36', length: '44' },
    { size: 'S', bust: '34 - 35', waist: '27 - 28', hip: '37 - 38', length: '45' },
    { size: 'M', bust: '36 - 37', waist: '29 - 30', hip: '39 - 40', length: '46' },
    { size: 'L', bust: '38 - 40', waist: '31 - 33', hip: '41 - 43', length: '47' },
    { size: 'XL', bust: '41 - 43', waist: '34 - 36', hip: '44 - 46', length: '48' },
    { size: 'XXL', bust: '44 - 46', waist: '37 - 39', hip: '47 - 49', length: '49' },
  ];

  // Chart data in cm (converted)
  const sizeDataCm = [
    { size: 'XS', bust: '81 - 84', waist: '63 - 66', hip: '89 - 91', length: '112' },
    { size: 'S', bust: '86 - 89', waist: '68 - 71', hip: '94 - 96', length: '114' },
    { size: 'M', bust: '91 - 94', waist: '73 - 76', hip: '99 - 102', length: '117' },
    { size: 'L', bust: '96 - 101', waist: '78 - 84', hip: '104 - 109', length: '119' },
    { size: 'XL', bust: '104 - 109', waist: '86 - 91', hip: '112 - 117', length: '122' },
    { size: 'XXL', bust: '112 - 117', waist: '94 - 99', hip: '119 - 124', length: '124' },
  ];

  const currentChart = unit === 'in' ? sizeDataInches : sizeDataCm;

  const handleCalculateSize = (e) => {
    e.preventDefault();
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);

    if (!h || !w) return;

    // Body Mass Index heuristic for size estimation
    const bmi = w / ((h / 100) * (h / 100));

    let size = 'M';
    if (bmi < 18.5) {
      size = 'XS';
    } else if (bmi < 21.5) {
      size = 'S';
    } else if (bmi < 24.5) {
      size = 'M';
    } else if (bmi < 28) {
      size = 'L';
    } else if (bmi < 31) {
      size = 'XL';
    } else {
      size = 'XXL';
    }

    setRecommendedSize(size);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div className="modal-header">
          <div className="flex-center" style={{ gap: '0.6rem' }}>
            <Ruler size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Size & Measurement Guide</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Unit Switcher */}
          <div className="flex-between">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Standard Brand Fit: Regular Fit Garments
            </span>
            <div style={{ display: 'flex', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', padding: '3px', border: '1px solid var(--border-main)' }}>
              <button 
                className={`btn btn-sm ${unit === 'in' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}
                onClick={() => setUnit('in')}
              >
                Inches (in)
              </button>
              <button 
                className={`btn btn-sm ${unit === 'cm' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}
                onClick={() => setUnit('cm')}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Measurements Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-subtle)', borderBottom: '2px solid var(--border-main)' }}>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }}>Size</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }}>Bust / Chest</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }}>Waist</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }}>Hips</th>
                  <th style={{ padding: '0.75rem', fontWeight: 700 }}>Length</th>
                </tr>
              </thead>
              <tbody>
                {currentChart.map((row, idx) => (
                  <tr 
                    key={row.size} 
                    style={{ 
                      borderBottom: '1px solid var(--border-subtle)',
                      background: recommendedSize === row.size ? 'var(--primary-light)' : (idx % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-subtle)')
                    }}
                  >
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: recommendedSize === row.size ? 'var(--primary)' : 'var(--text-main)' }}>
                      {row.size}
                      {recommendedSize === row.size && (
                        <span className="badge badge-primary" style={{ marginLeft: '6px', fontSize: '0.65rem' }}>Your Best Fit</span>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-body)' }}>{row.bust}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-body)' }}>{row.waist}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-body)' }}>{row.hip}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-body)' }}>{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Size Recommender Widget */}
          <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
              <div className="flex-center" style={{ gap: '0.5rem' }}>
                <Sparkles size={16} color="var(--primary)" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Find My True Size Calculator</h4>
              </div>
              {recommendedSize && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} /> Recommended: Size {recommendedSize}
                </div>
              )}
            </div>

            <form onSubmit={handleCalculateSize} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: 1, minWidth: '140px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Height (cm)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 165"
                  value={heightCm}
                  onChange={e => setHeightCm(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem' }}
                  required
                />
              </div>

              <div style={{ flex: 1, minWidth: '140px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Weight (kg)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 58"
                  value={weightKg}
                  onChange={e => setWeightKg(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 0.75rem' }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0.55rem 1.25rem' }}>
                Calculate Fit
              </button>
            </form>
          </div>

          {/* How to Measure Tips */}
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>How to Measure:</h5>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li><strong>Bust/Chest:</strong> Measure across the fullest part of your chest with tape relaxed.</li>
              <li><strong>Waist:</strong> Measure around the narrowest part of natural waistline.</li>
              <li><strong>Hips:</strong> Stand with feet together and measure around the widest point of hips.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
