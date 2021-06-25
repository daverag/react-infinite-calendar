/* eslint-disable sort-keys */
import React from 'react';
import {addDecorator, storiesOf} from '@kadira/storybook';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withDateSelection,
  withKeyboardSupport,
  withMultipleDates,
  withRange,
} from '../';
import styles from './stories.scss';


// Date manipulation utils
import {addDays, addMonths, endOfMonth, format, isBefore, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

const CenterDecorator = story => <div className={styles.center}>{story()}</div>;
addDecorator(CenterDecorator);

const today = new Date();

storiesOf('Basic settings', module)
  .add('Default Configuration', () => <InfiniteCalendar locale={fr} />)
  .add('Initially Selected Date', () => <InfiniteCalendar selected={addDays(today, 5)} />)
  .add('Blank Initial State', () => <InfiniteCalendar selected={null} />)
  .add('Min Date', () => (
    <InfiniteCalendar
      min={subMonths(today, 1)} // Minimum month to render
      minDate={addDays(today, 1)} // Minimum selectable date
      selected={addDays(today, 5)}
    />
  ))
  .add('Max Date', () => (
    <InfiniteCalendar
      max={endOfMonth(addMonths(today, 1))} // Maximum rendered month
      maxDate={today} // Maximum selectable date
    />
  ))
  .add('Disable Specific Dates', () => (
    <InfiniteCalendar
      disabledDates={[-10, -5, -6, 5, 6, 7, 2].map(amount =>
        addDays(today, amount)
      )}
    />
  ))
  .add('Disable Specific Weekdays', () => (
    <InfiniteCalendar disabledDays={[0, 6]} />
  ));

storiesOf('Higher Order Components', module)
  .add('Range selection', () => (
    <InfiniteCalendar
      selected={{
        start: addDays(new Date(), 2),
        end: addDays(new Date(), 17),
      }}
      locale={{
        headerFormat: 'MMM Do',
      }}
      Component={withRange(withKeyboardSupport(Calendar))}
    />
  ))
  .add('Multiple date selection', () => {
    return (
      <InfiniteCalendar
        selected={[addDays(today, -600), addDays(today, -200), today, addDays(today, 50), addDays(today, 400)]}
        interpolateSelection={defaultMultipleDateInterpolation}
        Component={withMultipleDates(withKeyboardSupport(Calendar))}
      />
    );
  })
  .add('Keyboard Support', () => {
    return <InfiniteCalendar Component={withDateSelection(withKeyboardSupport(Calendar))} />;
  });

storiesOf('Internationalization', module)
  .add('Locale', () => (
    <InfiniteCalendar
      events={[
        { 
          start: new Date('2021-06-26 10:00:00'),
          end: new Date('2021-06-26 12:00:00'),
          description: 'Bla bla bla',
          location: 'bla 2',
          className: 'event-social',
          repeat: ()=>{ return null },

        },
        { 
          start: new Date('2021-06-26 10:00:00'),
          end: new Date('2021-06-26 12:00:00'),
          description: 'Bla bla bla',
          location: 'bla 2',
          className: 'event-academique',
          repeat: ()=>{ return null },
          
        },
        { 
          start: new Date('2021-06-26 10:00:00'),
          end: new Date('2021-06-26 12:00:00'),
          description: 'Bla bla bla',
          location: 'bla 2',
          className: 'event-professionnel',
          repeat: ()=>{ return null },
          
        },
        { 
          start: new Date('2021-06-26 10:00:00'),
          end: new Date('2021-06-26 12:00:00'),
          description: 'Bla bla bla',
          location: 'bla 2',
          className: 'event-sport',
          repeat: ()=>{ return null },
          
        }
      ]}
      locale={{
        blank: 'Aucune date sélectionnée',
        headerFormat: 'EEEE d LLLL',        
        locale: require('date-fns/locale/fr'),
        todayLabel: {
          long: "Aujourd'hui",
          short: 'Auj.',
        },
        weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      }}
    />
  ))
  .add('First Day of the Week', () => (
    <InfiniteCalendar
      locale={{
        weekStartsOn: 1,
      }}
    />
  ));

storiesOf('Customization', module)
  .add('Theming', () => (
    <InfiniteCalendar
      theme={{
        floatingNav: {
          background: 'rgba(105, 74, 228, 0.91)',
          chevron: '#FFA726',
          color: '#FFF',
        },
        headerColor: 'rgb(127, 95, 251)',
        selectionColor: 'rgb(146, 118, 255)',
        textColor: {
          active: '#FFF',
          default: '#333',
        },
        weekdayColor: 'rgb(146, 118, 255)',
      }}
    />
  ))
  .add('Flexible Size', () => (
    <InfiniteCalendar
      width={'94%'}
      height={window.innerHeight - 147}
      rowHeight={70}
    />
  ))
  .add('Select Year First', () => (
    <InfiniteCalendar display={'years'} selected={null} />
  ))
  .add('Dynamic Selection Color', () => (
    <InfiniteCalendar
      selected={addDays(today, -1)}
      theme={{
        selectionColor: date => {
          return isBefore(date, today) ? '#EC6150' : '#559FFF';
        },
      }}
    />
  ));

storiesOf('Display Options', module)
  .add('Landscape Layout', () => (
    <InfiniteCalendar
      displayOptions={{
        layout: 'landscape',
      }}
      width={600}
      height={350}
    />
  ))
  .add('Disable Header', () => (
    <InfiniteCalendar
      displayOptions={{
        showHeader: false,
      }}
    />
  ))
  .add('Disable Header Animation', () => (
    <InfiniteCalendar
      displayOptions={{
        shouldHeaderAnimate: false,
      }}
    />
  ))
  .add('Disable Month Overlay', () => (
    <InfiniteCalendar
      displayOptions={{
        showOverlay: false,
      }}
    />
  ))
  .add('Disable Floating Today Helper', () => (
    <InfiniteCalendar
      displayOptions={{
        showTodayHelper: false,
      }}
    />
  ))
  .add('Hide Months in Year Selection', () => (
    <InfiniteCalendar
      display={'years'}
      displayOptions={{
        showMonthsForYears: false,
      }}
    />
  ))
  .add('Hide Weekdays Helper', () => (
    <InfiniteCalendar
      displayOptions={{
        showWeekdays: false,
      }}
    />
  ));

storiesOf('Events', module)
  .add('On Select', () => (
    <InfiniteCalendar
      onSelect={date =>
        alert(`You selected: ${format(date, 'EEEE dd LLLL')}`)}
    />
  ))
  .add('On Scroll', () => [
    <label key="label">Check your console logs.</label>,
    <InfiniteCalendar
      key="calendar"
      onScroll={scrollTop =>
        console.info('onScroll() – Scroll top:', scrollTop)}
    />,
  ]);
