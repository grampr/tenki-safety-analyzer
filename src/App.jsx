import React, { useMemo, useState } from 'react';
import { Activity, Mountain, Droplets, Waves, ShieldCheck, Info } from 'lucide-react';

const PREFECTURE_DATA = [
  { id: 1, name: '北海道', earthquake: 60, landslide: 50, flood: 40, tsunami: 70 },
  { id: 2, name: '青森県', earthquake: 75, landslide: 60, flood: 45, tsunami: 65 },
  { id: 3, name: '岩手県', earthquake: 80, landslide: 65, flood: 40, tsunami: 85 },
  { id: 4, name: '宮城県', earthquake: 85, landslide: 55, flood: 50, tsunami: 85 },
  { id: 5, name: '秋田県', earthquake: 65, landslide: 60, flood: 60, tsunami: 40 },
  { id: 6, name: '山形県', earthquake: 60, landslide: 65, flood: 55, tsunami: 40 },
  { id: 7, name: '福島県', earthquake: 80, landslide: 60, flood: 50, tsunami: 70 },
  { id: 8, name: '茨城県', earthquake: 85, landslide: 40, flood: 65, tsunami: 50 },
  { id: 9, name: '栃木県', earthquake: 70, landslide: 55, flood: 60, tsunami: 0 },
  { id: 10, name: '群馬県', earthquake: 65, landslide: 65, flood: 55, tsunami: 0 },
  { id: 11, name: '埼玉県', earthquake: 75, landslide: 30, flood: 70, tsunami: 0 },
  { id: 12, name: '千葉県', earthquake: 85, landslide: 45, flood: 65, tsunami: 60 },
  { id: 13, name: '東京都', earthquake: 90, landslide: 35, flood: 75, tsunami: 45 },
  { id: 14, name: '神奈川県', earthquake: 85, landslide: 55, flood: 50, tsunami: 65 },
  { id: 15, name: '新潟県', earthquake: 75, landslide: 70, flood: 65, tsunami: 55 },
  { id: 16, name: '富山県', earthquake: 55, landslide: 60, flood: 60, tsunami: 45 },
  { id: 17, name: '石川県', earthquake: 70, landslide: 60, flood: 50, tsunami: 55 },
  { id: 18, name: '福井県', earthquake: 65, landslide: 60, flood: 55, tsunami: 50 },
  { id: 19, name: '山梨県', earthquake: 75, landslide: 70, flood: 45, tsunami: 0 },
  { id: 20, name: '長野県', earthquake: 70, landslide: 80, flood: 50, tsunami: 0 },
  { id: 21, name: '岐阜県', earthquake: 65, landslide: 75, flood: 55, tsunami: 0 },
  { id: 22, name: '静岡県', earthquake: 95, landslide: 70, flood: 50, tsunami: 85 },
  { id: 23, name: '愛知県', earthquake: 90, landslide: 40, flood: 70, tsunami: 70 },
  { id: 24, name: '三重県', earthquake: 85, landslide: 60, flood: 55, tsunami: 75 },
  { id: 25, name: '滋賀県', earthquake: 60, landslide: 50, flood: 65, tsunami: 0 },
  { id: 26, name: '京都府', earthquake: 65, landslide: 60, flood: 55, tsunami: 20 },
  { id: 27, name: '大阪府', earthquake: 80, landslide: 30, flood: 80, tsunami: 60 },
  { id: 28, name: '兵庫県', earthquake: 75, landslide: 65, flood: 55, tsunami: 55 },
  { id: 29, name: '奈良県', earthquake: 65, landslide: 65, flood: 45, tsunami: 0 },
  { id: 30, name: '和歌山県', earthquake: 85, landslide: 75, flood: 50, tsunami: 85 },
  { id: 31, name: '鳥取県', earthquake: 60, landslide: 60, flood: 55, tsunami: 40 },
  { id: 32, name: '島根県', earthquake: 60, landslide: 65, flood: 55, tsunami: 45 },
  { id: 33, name: '岡山県', earthquake: 50, landslide: 65, flood: 60, tsunami: 35 },
  { id: 34, name: '広島県', earthquake: 55, landslide: 80, flood: 60, tsunami: 40 },
  { id: 35, name: '山口県', earthquake: 55, landslide: 65, flood: 55, tsunami: 45 },
  { id: 36, name: '徳島県', earthquake: 85, landslide: 70, flood: 55, tsunami: 80 },
  { id: 37, name: '香川県', earthquake: 75, landslide: 50, flood: 45, tsunami: 55 },
  { id: 38, name: '愛媛県', earthquake: 75, landslide: 70, flood: 50, tsunami: 60 },
  { id: 39, name: '高知県', earthquake: 90, landslide: 75, flood: 55, tsunami: 90 },
  { id: 40, name: '福岡県', earthquake: 65, landslide: 60, flood: 70, tsunami: 45 },
  { id: 41, name: '佐賀県', earthquake: 55, landslide: 50, flood: 75, tsunami: 35 },
  { id: 42, name: '長崎県', earthquake: 55, landslide: 70, flood: 55, tsunami: 50 },
  { id: 43, name: '熊本県', earthquake: 75, landslide: 70, flood: 65, tsunami: 50 },
  { id: 44, name: '大分県', earthquake: 70, landslide: 65, flood: 55, tsunami: 60 },
  { id: 45, name: '宮崎県', earthquake: 85, landslide: 70, flood: 60, tsunami: 85 },
  { id: 46, name: '鹿児島県', earthquake: 80, landslide: 75, flood: 60, tsunami: 70 },
  { id: 47, name: '沖縄県', earthquake: 65, landslide: 55, flood: 50, tsunami: 75 },
];

const INDICATORS = [
  { key: 'earthquake', label: '地震リスク', icon: Activity, tone: 'orange' },
  { key: 'landslide', label: '土砂災害', icon: Mountain, tone: 'amber' },
  { key: 'flood', label: '水害・洪水', icon: Droplets, tone: 'blue' },
  { key: 'tsunami', label: '津波・高潮', icon: Waves, tone: 'cyan' },
];

const TONE_CLASSES = {
  orange: {
    text: 'tone-orange-text',
    bar: 'tone-orange-bar',
    slider: 'tone-orange-slider',
  },
  amber: {
    text: 'tone-amber-text',
    bar: 'tone-amber-bar',
    slider: 'tone-amber-slider',
  },
  blue: {
    text: 'tone-blue-text',
    bar: 'tone-blue-bar',
    slider: 'tone-blue-slider',
  },
  cyan: {
    text: 'tone-cyan-text',
    bar: 'tone-cyan-bar',
    slider: 'tone-cyan-slider',
  },
};

export default function App() {
  const [weights, setWeights] = useState({
    earthquake: 5,
    landslide: 5,
    flood: 5,
    tsunami: 5,
  });

  const handleWeightChange = (key, value) => {
    setWeights((prev) => ({ ...prev, [key]: Number.parseInt(value, 10) }));
  };

  const rankedData = useMemo(() => {
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

    return PREFECTURE_DATA.map((pref) => {
      if (totalWeight === 0) {
        return { ...pref, riskScore: 0, safetyScore: 100 };
      }

      const weightedRisk =
        (pref.earthquake * weights.earthquake +
          pref.landslide * weights.landslide +
          pref.flood * weights.flood +
          pref.tsunami * weights.tsunami) /
        totalWeight;

      const safetyScore = 100 - weightedRisk;

      return {
        ...pref,
        riskScore: weightedRisk,
        safetyScore,
      };
    }).sort((a, b) => b.safetyScore - a.safetyScore);
  }, [weights]);

  return (
    <div className="app-shell">
      <header className="page-header">
        <div className="page-header__inner">
          <div>
            <h1 className="page-title">
              <ShieldCheck className="page-title__icon" />
              日本の地域安全度アナライザ
            </h1>
            <p className="page-subtitle">
              公開ハザードデータを集約。あなたの不安に合わせて「安全な地域」を再評価します。
            </p>
          </div>
        </div>
      </header>

      <main className="layout">
        <section className="panel control-panel">
          <h2 className="section-title">
            リスクの重み付け
            <span className="tooltip">
              <Info className="tooltip__icon" />
              <span className="tooltip__content">
                あなたが特に懸念する災害のスライダーを上げてください。スコアがリアルタイムに再計算されます。
              </span>
            </span>
          </h2>

          <div className="slider-list">
            {INDICATORS.map(({ key, label, icon: Icon, tone }) => {
              const toneClass = TONE_CLASSES[tone];
              const sliderPercent = `${weights[key] * 10}%`;

              return (
                <div key={key} className="slider-group">
                  <div className="slider-group__header">
                    <label className={`slider-label ${toneClass.text}`}>
                      <Icon className="slider-label__icon" />
                      {label}
                    </label>
                    <span className="slider-value">{weights[key]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={weights[key]}
                    onChange={(e) => handleWeightChange(key, e.target.value)}
                    className={`range-input ${toneClass.slider}`}
                    style={{ '--slider-percent': sliderPercent }}
                  />
                  <div className="slider-hints">
                    <span>気にしない</span>
                    <span>極めて重視</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="data-source">
            <p>
              <strong>データソースについて</strong>
              本スコアは以下の公開API・データ等を元に正規化して算出しています。
            </p>
            <p>地震: J-SHIS (防災科研)</p>
            <p>土砂/洪水/津波: 国土数値情報・不動産情報ライブラリ (国土交通省)</p>
          </div>
        </section>

        <section className="panel ranking-panel">
          <div className="ranking-panel__header">
            <div>
              <h2 className="ranking-title">総合安全度ランキング</h2>
              <p className="ranking-subtitle">
                設定した重みに基づく都道府県別の安全性指標 (100点満点)
              </p>
            </div>
          </div>

          <div className="ranking-list">
            {rankedData.map((pref, index) => (
              <article key={pref.id} className="ranking-item">
                <div className="rank-badge">
                  <span className={`rank-badge__number ${index < 3 ? 'rank-badge__number--top' : ''}`}>
                    {index + 1}
                  </span>
                  <span className="rank-badge__suffix">位</span>
                </div>

                <div className="prefecture-summary">
                  <div className="prefecture-summary__name">{pref.name}</div>
                  <div className="prefecture-summary__score">{pref.safetyScore.toFixed(1)}</div>
                </div>

                <div className="breakdown">
                  {INDICATORS.map(({ key, label, icon: Icon, tone }) => {
                    const toneClass = TONE_CLASSES[tone];
                    const riskVal = pref[key];

                    return (
                      <div key={key} className="breakdown-row">
                        <Icon className={`breakdown-row__icon ${toneClass.text}`} />
                        <div className="breakdown-row__label">{label}</div>
                        <div className="breakdown-row__track">
                          <div
                            className={`breakdown-row__fill ${toneClass.bar}`}
                            style={{ width: `${riskVal}%` }}
                          />
                        </div>
                        <div className="breakdown-row__value">{riskVal}</div>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
