import React, { useEffect, useRef } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

interface GeoMapProps {
  data: {
    data: Array<{
      id: string;
      value: number;
    }>;
  };
  width?: number;
  height?: number;
}

const GeoMap: React.FC<GeoMapProps> = ({ data, width = 800, height = 250 }) => {
  const ref = useRef<SVGSVGElement>(null);
  const backgroundColor = useColorModeValue('#F7FAFC', '#1A202C');
  const strokeColor = useColorModeValue('#E2E8F0', '#2D3748');

  useEffect(() => {
    if (!ref.current || !data.data.length) return;

    // Clear previous chart
    d3.select(ref.current).selectAll('*').remove();

    // Create SVG
    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height);

    // Create a color scale
    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateBlues)
      .domain([0, d3.max(data.data, d => d.value) || 100]);

    // Create a map for quick value lookup
    const valueById = new Map(data.data.map(d => [d.id, d.value]));

    // Simplified US states data for demonstration
    // In a real application, you would load this from a TopoJSON file
    const usStates = {
      type: 'FeatureCollection',
      features: [
        { type: 'Feature', id: 'US-WA', properties: { name: 'Washington' }, geometry: { type: 'Polygon', coordinates: [[[-125, 49], [-117, 49], [-117, 45.5], [-125, 45.5], [-125, 49]]] } },
        { type: 'Feature', id: 'US-OR', properties: { name: 'Oregon' }, geometry: { type: 'Polygon', coordinates: [[[-125, 46], [-117, 46], [-117, 42], [-125, 42], [-125, 46]]] } },
        { type: 'Feature', id: 'US-CA', properties: { name: 'California' }, geometry: { type: 'Polygon', coordinates: [[[-125, 42], [-114, 42], [-114, 32], [-125, 32], [-125, 42]]] } },
        // Add more states as needed
      ]
    };

    // Create a projection
    const projection = d3.geoAlbersUsa()
      .fitSize([width, height], usStates as any);

    // Create a path generator
    const path = d3.geoPath().projection(projection);

    // Draw the map
    svg.selectAll('path')
      .data(usStates.features)
      .enter()
      .append('path')
      .attr('d', path as any)
      .attr('fill', d => {
        const value = valueById.get(d.id as string);
        return value !== undefined ? colorScale(value) : backgroundColor;
      })
      .attr('stroke', strokeColor)
      .attr('stroke-width', 0.5)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('stroke-width', 2)
          .attr('stroke', '#2563EB');
        
        const value = valueById.get(d.id as string) || 0;
        
        // Show tooltip
        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.properties.name}</strong><br/>Value: ${value}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('stroke-width', 0.5)
          .attr('stroke', strokeColor);
        
        tooltip.style('opacity', 0);
      });

    // Add tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'geomap-tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('font-size', '12px')
      .style('opacity', 0);

    // Add a legend
    const legendWidth = 200;
    const legendHeight = 10;
    const legendX = width - legendWidth - 20;
    const legendY = height - 30;

    // Create gradient for legend
    const defs = svg.append('defs');
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'geo-color-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    linearGradient.selectAll('stop')
      .data(d3.range(0, 1.01, 0.1))
      .enter()
      .append('stop')
      .attr('offset', d => d * 100 + '%')
      .attr('stop-color', d => colorScale(d * (d3.max(data.data, d => d.value) || 100)));

    // Draw legend rectangle
    svg.append('rect')
      .attr('x', legendX)
      .attr('y', legendY)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#geo-color-gradient)');

    // Add legend labels
    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY - 5)
      .style('font-size', '10px')
      .style('fill', useColorModeValue('#1A202C', '#E2E8F0'))
      .text('Low');

    svg.append('text')
      .attr('x', legendX + legendWidth)
      .attr('y', legendY - 5)
      .style('font-size', '10px')
      .style('text-anchor', 'end')
      .style('fill', useColorModeValue('#1A202C', '#E2E8F0'))
      .text('High');

    // Cleanup function
    return () => {
      d3.select('body').selectAll('.geomap-tooltip').remove();
    };
  }, [data, width, height, backgroundColor, strokeColor]);

  return <svg ref={ref} />;
};

export default GeoMap;
