import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Rating } from '@/components/ui/raiting'
import { TApp } from '@/lib/schemas'
import Image from 'next/image'
import Link from 'next/link'
import { PiUserThin } from 'react-icons/pi'

interface ApplicationCardProps {
  application: TApp
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <Link
      href={{
        pathname: `/apps/${application.id}`,
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image
              src={application.icon}
              alt={application.app_name}
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <CardTitle>{application.app_name}</CardTitle>
              <CardDescription>{application.categories}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">{application.description}</p>
          <div className="flex flex-wrap gap-2">
            {application.tags
              ?.split(';')
              ?.filter((i) => i.length)
              .map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
          </div>
          {/* user count and rank */}
          <div className="mt-4 flex items-center justify-between">
            {application.user_count ? (
              <div className="flex items-center gap-2">
                <PiUserThin size={20} />
                <span>{application.user_count}</span>
              </div>
            ) : (
              <span className="text-sm font-thin text-gray-600">暂无用户</span>
            )}

            <Rating
              size="sm"
              disabled
              max={5}
              value={application.score}
              className="text-orange-600"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
