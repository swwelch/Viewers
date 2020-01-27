import React, { useState, useEffect } from 'react';
import { Range } from '@ohif/ui';

import './SegmentationSettings.css';

const SegmentationSettings = ({ configuration, onBack, onChange }) => {
  const [state, setState] = useState({ ...configuration });

  useEffect(() => {
    setState(state => ({ ...state, ...configuration }));
  }, [configuration]);

  useEffect(() => {
    onChange(state);
  }, [state]);

  const check = field => {
    setState(state => ({ ...state, [field]: !state[field] }));
  };

  const save = (field, value) => {
    setState(state => ({ ...state, [field]: value }));
  };

  return (
    <div className="segmentation-settings">
      <div className="settings-title">
        <h3>Segmentations Settings</h3>
        <button className="db-button" onClick={onBack}>
          Back
        </button>
      </div>
      <div
        className="settings-group"
        style={{ marginBottom: state.renderFill ? 30 : 0 }}
      >
        <CustomCheck
          label="Segment Fill"
          checked={state.renderFill}
          onChange={() => check('renderFill')}
        />
        {state.renderFill && (
          <CustomRange
            label="Opacity"
            step={1}
            min={0}
            max={100}
            value={state.fillAlpha * 100}
            onChange={event => save('fillAlpha', parseFloat(event.target.value / 100))}
            showPercentage
          />
        )}
      </div>
      <div
        className="settings-group"
        style={{ marginBottom: state.renderOutline ? 30 : 0 }}
      >
        <CustomCheck
          label="Segment Outline"
          checked={state.renderOutline}
          onChange={() => check('renderOutline')}
        />
        {state.renderOutline && (
          <CustomRange
            value={state.outlineAlpha * 100}
            label="Opacity"
            showPercentage
            step={1}
            min={0}
            max={100}
            onChange={event => save('outlineAlpha', parseFloat(event.target.value / 100))}
          />
        )}
        {state.renderOutline && (
          <CustomRange
            value={state.outlineWidth}
            label="Width"
            showValue
            step={1}
            min={0}
            max={100}
            onChange={event => save('outlineWidth', parseInt(event.target.value))}
          />
        )}
      </div>
      <div
        className="settings-group"
        style={{ marginBottom: state.shouldRenderInactiveLabelmaps ? 30 : 0 }}
      >
        <CustomCheck
          label="Render inactive segmentations"
          checked={state.shouldRenderInactiveLabelmaps}
          onChange={() => check('shouldRenderInactiveLabelmaps')}
        />
        {state.shouldRenderInactiveLabelmaps && (
          <>
            <CustomRange
              label="Fill Opacity"
              showPercentage
              step={1}
              min={0}
              max={100}
              value={state.fillAlphaInactive * 100}
              onChange={event => save('fillAlphaInactive', parseFloat(event.target.value / 100))}
            />
            <CustomRange
              label="Outline Opacity"
              showPercentage
              step={1}
              min={0}
              max={100}
              value={state.outlineAlphaInactive * 100}
              onChange={event => save('outlineAlphaInactive', parseFloat(event.target.value / 100))}
            />
          </>
        )}
      </div>
    </div>
  );
};

const CustomCheck = ({ label, checked, onChange }) => {
  return (
    <div className="custom-check">
      <label>
        <span>{label}</span>
        <input type="checkbox" checked={checked} onChange={onChange} />
      </label>
    </div>
  );
};

const CustomRange = props => {
  const { label, onChange } = props;
  return (
    <div className="range">
      <label htmlFor="range">{label}</label>
      <Range
        {...props}
        onChange={event => {
          event.persist();
          onChange(event);
        }}
      />
    </div>
  );
};

export default SegmentationSettings;