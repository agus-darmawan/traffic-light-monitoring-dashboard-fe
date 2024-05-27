import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function RecentRegister() {
  const data = [
    {
      tid: 419017,
      name: 'Perempatan Sudirman',
      time: '12:10',
      zone_name: 'Zona 1'
    },
    {
      tid: 419018,
      name: 'Perempatan Thamrin',
      time: '12:15',
      zone_name: 'Zona 2'
    },
    {
      tid: 419019,
      name: 'Perempatan Kuningan',
      time: '12:20',
      zone_name: 'Zona 3'
    },
    {
      tid: 419020,
      name: 'Perempatan Senayan',
      time: '12:25',
      zone_name: 'Zona 4'
    },
    {
      tid: 419021,
      name: 'Perempatan Menteng',
      time: '12:30',
      zone_name: 'Zona 5'
    },
    {
      tid: 419021,
      name: 'Perempatan Menteng',
      time: '12:30',
      zone_name: 'Zona 5'
    }
  ];
  return (
    <div className="space-y-8 lg:min-h-[42vh]">
      {data.map((item, index) => (
        <div key={item.tid} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{index + 1}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">
                [TID] {item.tid} - {item.zone_name}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">{item.name}</p>
          </div>
          <div className="ml-auto font-medium">{item.time}</div>
        </div>
      ))}
    </div>
  );
}
